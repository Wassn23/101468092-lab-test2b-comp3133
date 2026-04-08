import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Character } from '../../models/character';
import { HarrypotterService } from '../../services/harrypotter';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.css'
})
export class CharacterdetailsComponent implements OnInit {
  character = signal<Character | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private harryPotterService: HarrypotterService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Character ID not found.');
      this.loading.set(false);
      return;
    }

    this.harryPotterService.getCharacterById(id).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.character.set(data[0]);
        } else {
          this.error.set('Character not found.');
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load character details.');
        this.loading.set(false);
      }
    });
  }
}