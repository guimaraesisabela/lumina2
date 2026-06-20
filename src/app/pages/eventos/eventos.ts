import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Evento {
  id: number;
  titulo: string;
  espaco: string;
  dataHora: string;
  ingressosVendidos: number;
  capacidade: number;
  valor: string;
  status: 'agendado' | 'em-andamento' | 'encerrado' | 'cancelado';
  statusLabel: string;
  imagem: string;
  hovered?: boolean;
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos.html',
  styleUrl: './eventos.scss',
})
export class EventosComponent {
  filtroAtivo = 'todos';

  eventos: Evento[] = [
    {
      id: 1,
      titulo: 'O Mistério da Meia-Noite',
      espaco: 'Sala Noir',
      dataHora: 'Sáb, 24 Out • 21:00',
      ingressosVendidos: 45,
      capacidade: 80,
      valor: '45,00',
      status: 'agendado',
      statusLabel: 'Agendado',
      imagem: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=200&fit=crop',
    },
    {
      id: 2,
      titulo: 'Quinteto de Jazz: Ecos de Paris',
      espaco: 'Palco Central',
      dataHora: 'Hoje • 19:30 - 22:30',
      ingressosVendidos: 120,
      capacidade: 120,
      valor: '85,00',
      status: 'em-andamento',
      statusLabel: 'Em andamento',
      imagem: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=200&fit=crop',
    },
    {
      id: 3,
      titulo: 'Maratona Sci-Fi: Neon Dreams',
      espaco: 'Sala Noir',
      dataHora: 'Ontem, 21 Out',
      ingressosVendidos: 245,
      capacidade: 250,
      valor: '60,00',
      status: 'encerrado',
      statusLabel: 'Encerrado',
      imagem: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=200&fit=crop',
    },
    {
      id: 4,
      titulo: 'Sinfonia das Sombras',
      espaco: 'Palco Central',
      dataHora: 'Dom, 25 Out • 18:00',
      ingressosVendidos: 30,
      capacidade: 200,
      valor: '70,00',
      status: 'agendado',
      statusLabel: 'Agendado',
      imagem: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&h=200&fit=crop',
    },
    {
      id: 5,
      titulo: 'Blade Runner 2049',
      espaco: 'Sala Noir',
      dataHora: 'Sex, 22 Out • 20:00',
      ingressosVendidos: 0,
      capacidade: 80,
      valor: '35,00',
      status: 'cancelado',
      statusLabel: 'Cancelado',
      imagem: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=200&fit=crop',
    },
  ];

  eventosFiltrados() {
    if (this.filtroAtivo === 'todos') return this.eventos;
    return this.eventos.filter((e) => e.status === this.filtroAtivo);
  }

  setFiltro(filtro: string) {
    this.filtroAtivo = filtro;
  }
}