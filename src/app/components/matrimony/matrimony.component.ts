import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  occupation: string;
}

@Component({
  selector: 'app-matrimony',
  templateUrl: './matrimony.component.html',
  styleUrls: ['./matrimony.component.css']
})
export class MatrimonyComponent {
  users: User[] = [];
  newUser: User = {} as User;
  editedUser: User = {} as User;
  isEditing = false;
  searchKeyword = '';

  constructor() { }

  addUser(): void {
    this.newUser.id = this.users.length + 1;
    this.users.push({ ...this.newUser });
    this.newUser = {} as User;
  }

  editUser(user: User): void {
    this.isEditing = true;
    this.editedUser = { ...user };
  }

  saveEditedUser(): void {
    const index = this.users.findIndex(user => user.id === this.editedUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.editedUser };
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedUser = {} as User;
  }

  deleteUser(user: User): void {
    this.users = this.users.filter(item => item.id !== user.id);
  }

  get filteredUsers(): User[] {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
