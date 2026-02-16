import { Component, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar';
import { ButtonComponent } from '../../shared/components/button/button';
import { TableComponent, TableColumn, TableAction } from '../../shared/components/table/table';
import { PaginationComponent } from '../../shared/components/pagination/pagination';
import { ModalComponent } from '../../shared/components/modal/modal';
import { DropdownComponent, DropdownOption } from '../../shared/components/dropdown/dropdown';

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: 'Admin' | 'Corretor';
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
  imports: [
    CommonModule,
    FormsModule,
    SearchBarComponent,
    ButtonComponent,
    TableComponent,
    PaginationComponent,
    ModalComponent,
    DropdownComponent
  ],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss']
})
export class UserManagementComponent implements AfterViewInit {
  searchTerm: string = '';
  loading: boolean = false;
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
    document: ''
  };

  roleOptions: DropdownOption[] = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Corretor', value: 'corretor' }
  ];

  @ViewChild('nameTemplate') nameTemplate!: TemplateRef<any>;
  @ViewChild('roleTemplate') roleTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  userColumns: TableColumn[] = [];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.userColumns = [
        { key: 'name', label: 'NOME', sortable: true, template: this.nameTemplate, width: '250px' },
        { key: 'role', label: 'FUNÇÃO', sortable: true, template: this.roleTemplate, width: '150px' },
        { key: 'phone', label: 'CONTATO', sortable: false, width: '180px' },
        { key: 'email', label: 'EMAIL', sortable: true },
        { key: 'status', label: 'SITUAÇÃO', sortable: true, template: this.statusTemplate, width: '120px', align: 'center' }
      ];
    });
  }

  allUsers: User[] = [
    {
      id: '#0832',
      name: 'Carlos Silva',
      avatar: 'https://i.pravatar.cc/150?img=12',
      email: 'carlos.silva@imob.com',
      role: 'Admin',
      phone: '(11) 98765-4321',
      status: 'Ativo'
    },
    {
      id: '#5201',
      name: 'Fernanda Costa',
      avatar: 'https://i.pravatar.cc/150?img=45',
      email: 'fernanda.costa@imob.com',
      role: 'Corretor',
      phone: '(21) 99888-7777',
      status: 'Ativo'
    },
    {
      id: '#7741',
      name: 'Roberto Mendes',
      avatar: 'https://i.pravatar.cc/150?img=33',
      email: 'roberto.m@imob.com',
      role: 'Corretor',
      phone: '(31) 95555-4444',
      status: 'Inativo'
    },
    {
      id: '#8109',
      name: 'Ana Julia',
      avatar: 'https://i.pravatar.cc/150?img=48',
      email: 'ana.julia@imob.com',
      role: 'Admin',
      phone: '(41) 93333-2222',
      status: 'Ativo'
    },
    {
      id: '#6521',
      name: 'Lucas Almeida',
      avatar: 'https://i.pravatar.cc/150?img=15',
      email: 'lucas.almeida@imob.com',
      role: 'Corretor',
      phone: '(11) 91221-9988',
      status: 'Ativo'
    }
  ];

  userActions: TableAction[] = [
    {
      icon: 'edit',
      label: 'Editar',
      color: 'primary',
      callback: (row) => this.onEdit(row)
    },
    {
      icon: 'delete',
      label: 'Excluir',
      color: 'danger',
      callback: (row) => this.onDelete(row)
    }
  ];

  get filteredUsers(): User[] {
    let filtered = this.allUsers;

    if (this.activeTab === 'administradores') {
      filtered = filtered.filter(user => user.role === 'Admin');
    } else if (this.activeTab === 'corretores') {
      filtered = filtered.filter(user => user.role === 'Corretor');
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phone.includes(term)
      );
    }

    return filtered;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  get displayCount(): string {
    const total = this.filteredUsers.length;
    const start = total > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
    const end = Math.min(this.currentPage * this.itemsPerPage, total);
    return `Mostrando ${start} de ${total} usuários`;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onAddUser(): void {
    this.isModalOpen = true;
  }

  onCloseModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }

  onRoleChange(value: any): void {
    this.newUser.role = value;
  }

  onSubmitNewUser(): void {
    console.log('Novo usuário:', this.newUser);
    this.onCloseModal();
  }

  resetForm(): void {
    this.newUser = {
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      phone: '',
      document: ''
    };
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
  }

  onRowClick(row: any): void {
    console.log('Linha clicada:', row);
  }

  onSelectionChange(selectedRows: any[]): void {
    console.log('Seleção alterada:', selectedRows);
  }

  onEdit(user: User): void {
    console.log('Editar usuário:', user);
  }

  onDelete(user: User): void {
    console.log('Excluir usuário:', user);
  }
}