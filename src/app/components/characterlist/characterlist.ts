import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Character } from '../../models/character';
import { HarrypotterService } from '../../services/harrypotter';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.css'
})
export class CharacterlistComponent implements OnInit {
  characters = signal<Character[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private harryPotterService: HarrypotterService) {}

  ngOnInit(): void {
    this.harryPotterService.getAllCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load characters.');
        this.loading.set(false);
      }
    });
  }
}