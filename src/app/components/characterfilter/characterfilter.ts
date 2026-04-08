import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarrypotterService } from '../../services/harrypotter';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characterfilter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.css'
})
export class CharacterfilterComponent implements OnInit {

  characters = signal<Character[]>([]);
  filteredCharacters = signal<Character[]>([]);

  constructor(private hpService: HarrypotterService) {}

  ngOnInit(): void {
      this.hpService.getAllCharacters().subscribe((data: Character[]) => {
      this.characters.set(data);
      this.filteredCharacters.set(data);
    });
  }

  filterByHouse(event: any) {
    const house = event.target.value;

    if (!house) {
      this.filteredCharacters.set(this.characters());
      return;
    }

    const filtered = this.characters().filter(c => c.house === house);
    this.filteredCharacters.set(filtered);
  }
}