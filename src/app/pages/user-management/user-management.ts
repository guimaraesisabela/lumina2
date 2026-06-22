import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: 'Admin' | 'Organizador';
  phone: string;
  status: 'Ativo' | 'Inativo';
}

interface NewUserForm {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  document: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss'],
})
export class UserManagementComponent {
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  activeTab: string = 'todos';
  isModalOpen: boolean = false;

  newUser: NewUserForm = {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    phone: '',
    document: '',
  };

  allUsers: User[] = [
    { id: '#0832', name: 'Carlos Silva', avatar: 'https://i.pravatar.cc/150?img=12', email: 'carlos@lumina.com', role: 'Admin', phone: '(11) 98765-4321', status: 'Ativo' },
    { id: '#5201', name: 'Fernanda Costa', avatar: 'https://i.pravatar.cc/150?img=45', email: 'fernanda@lumina.com', role: 'Organizador', phone: '(21) 99888-7777', status: 'Ativo' },
    { id: '#7741', name: 'Roberto Mendes', avatar: 'https://i.pravatar.cc/150?img=33', email: 'roberto@lumina.com', role: 'Organizador', phone: '(31) 95555-4444', status: 'Inativo' },
    { id: '#8109', name: 'Ana Julia', avatar: 'https://i.pravatar.cc/150?img=48', email: 'ana@lumina.com', role: 'Admin', phone: '(41) 93333-2222', status: 'Ativo' },
    { id: '#6521', name: 'Lucas Almeida', avatar: 'https://i.pravatar.cc/150?img=15', email: 'lucas@lumina.com', role: 'Organizador', phone: '(11) 91221-9988', status: 'Ativo' },
  ];

  get filteredUsers(): User[] {
    let filtered = this.allUsers;

    if (this.activeTab === 'administradores') {
      filtered = filtered.filter((u) => u.role === 'Admin');
    } else if (this.activeTab === 'organizadores') {
      filtered = filtered.filter((u) => u.role === 'Organizador');
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get displayCount(): string {
    const total = this.filteredUsers.length;
    const start = total > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
    const end = Math.min(this.currentPage * this.itemsPerPage, total);
    return `Mostrando ${start}-${end} de ${total} usuários`;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
  }

  onAddUser(): void {
    this.isModalOpen = true;
  }

  onCloseModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }

  onSubmitNewUser(): void {
    console.log('Novo usuário:', this.newUser);
    this.onCloseModal();
  }

  resetForm(): void {
    this.newUser = { firstName: '', lastName: '', role: '', email: '', phone: '', document: '' };
  }

  onEdit(user: User): void {
    console.log('Editar:', user);
  }

  onDelete(user: User): void {
    console.log('Excluir:', user);
  }
}
