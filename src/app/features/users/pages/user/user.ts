import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserForm } from '../../components/user-form/user-form';

@Component({
  imports: [UserForm],
  selector: 'app-user',
  styleUrl: './user.css',
  templateUrl: './user.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class User {}
