import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css']
})
export class ViewDocumentsComponent implements OnInit {

  documents: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
  const email = localStorage.getItem('email');
  if (email) {
    this.customerService.getUploadedDocuments(email).subscribe({
      next: (docs) => {
        this.documents = docs;
        console.log("Fetched documents:", docs);
      },
      error: (err) => {
        console.error('Error fetching documents:', err);
        alert("Failed to load documents.");
      }
    });
  }
}
viewDocument(fileName: string) {
  const url = `http://localhost:8080/customer/download-document?fileName=${fileName}`;

  window.open(url, '_blank');
}


}
