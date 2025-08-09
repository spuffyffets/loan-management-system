import { Component, OnInit } from '@angular/core';
import { CustomerService, SanctionDetails } from 'src/app/shared/services/customer.service';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {
  documentsMap: { [appId: number]: boolean } = {};
hasDocuments(appId: number): boolean {
  return this.documentsMap[appId] === true;
}

  applications: any[] = [];

sanctionDetailsMap: { [loanAppId: number]: SanctionDetails } = {};
  showSanctionDetailsForAppId: number | null = null;
  sanctionLoading: boolean = false;
 
  uploadedDocuments: { [type: string]: string } = {};
  selectedFiles: { [type: string]: File } = {};

  selectedAppId!: number;
  showUploadForm: boolean = false;

  documentTypes: string[] = [
    'AADHAAR', 'PAN', 'SALARY_SLIP', 'BANK_STATEMENT',
    'ADDRESS_PROOF', 'EMPLOYMENT_PROOF', 'PROPERTY_DOCUMENT',
    'PHOTO', 'SIGNATURE'
  ];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
  const email = localStorage.getItem('email');
  if (email) {
    this.customerService.getApplications(email).subscribe({
      next: (apps) => {
        this.applications = apps;

        // For each application, fetch documents or check if docs exist
        apps.forEach(app => {
          this.customerService.getUploadedDocuments(email).subscribe({
            next: (docs) => {
              // Check if docs exist for this app (adjust logic as per your data)
              this.documentsMap[app.id] = docs.some(doc => doc.applicationId === app.id);
            },
            error: (err) => console.error('Error fetching docs', err)
          });
        });
      }
    });
  }
}


  deleteApplication(id: number) {
    const email = localStorage.getItem('email');
    if (email) {
      this.customerService.deleteLoan(id, email).subscribe({
        next: (res) => {
          alert(res);
          this.applications = this.applications.filter(app => app.id !== id);
        },
        error: (err) => {
          console.error("Delete error:", err);
          alert("Delete failed: " + err.error);
        }
      });
    } else {
      alert("Email not found in localStorage.");
    }
  }

  openUploadModal(appId: number): void {
    this.selectedAppId = appId;
    this.showUploadForm = true;

    const email = localStorage.getItem('email');
    if (email) {
      this.customerService.getUploadedDocuments(email).subscribe({
        next: (docs) => {
          this.uploadedDocuments = {};
          docs.forEach((doc: any) => {
            this.uploadedDocuments[doc.documentType] = doc.fileName;
          });
        },
        error: (err) => {
          console.error('Error fetching uploaded documents', err);
        }
      });
    }
  }

getUploadedCount(): string {
  const uploaded = Object.keys(this.uploadedDocuments).length;
  return `${uploaded}/9 Documents Uploaded`;
}



  closeUploadForm(): void {
    this.showUploadForm = false;
    this.selectedFiles = {};
    this.uploadedDocuments = {};
  }

 onFileSelectedPerType(event: Event, type: string): void {
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    this.selectedFiles[type] = target.files[0];
  }
}


  uploadPerType(type: string): void {
    const email = localStorage.getItem('email');
    const file = this.selectedFiles[type];

    if (!file || !email) {
      alert("Please select a file.");
      return;
    }

    this.customerService.uploadDocument(file, email, type).subscribe({
      next: (res) => {
        alert(`${type} uploaded successfully!`);
        this.uploadedDocuments[type] = file.name;
        delete this.selectedFiles[type];
      },
      error: (err) => {
        console.error('Upload failed:', err);
        alert("Upload failed: " + err.error);
      }
    });
  }


formatStatus(status: string): string {
  return status.replace(/_/g, ' ');
}

viewSanctionLetter(appId: number): void {
  const email = localStorage.getItem('email');
  if (!email) {
    alert('User email not found.');
    return;
  }

  this.sanctionLoading = true;
  this.customerService.getSanctionDetails(appId, email).subscribe({
    next: (details) => {
      this.sanctionDetailsMap[appId] = details;
      this.showSanctionDetailsForAppId = appId;
      this.sanctionLoading = false;
    },
    error: (err) => {
      alert('Failed to load sanction details');
      this.sanctionLoading = false;
    }
  });
}

downloadSanctionLetter(appId: number): void {
  const email = localStorage.getItem('email');
  if (!email) {
    alert('User email not found.');
    return;
  }

  this.customerService.downloadSanctionLetter(appId, email).subscribe({
    next: (blob) => {
      const fileName = `Sanction_Letter_${appId}.pdf`;
      saveAs(blob, fileName);
    },
    error: (err) => {
      alert('Failed to download sanction letter');
    }
  });
}

closeSanctionDetails(): void {
  this.showSanctionDetailsForAppId = null;
}



}
