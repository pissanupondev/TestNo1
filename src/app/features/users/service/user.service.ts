import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiResponse, ICreateUserResponseData, IUser } from '../model/user.model';
import { Observable, Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = environment.apiUrl;
  private hubUrl = environment.hubUrl; 
  private hubConnection?: signalR.HubConnection;

  private userUpdatedSource = new Subject<IUser>();
  public userUpdated$ = this.userUpdatedSource.asObservable();
  public isConnected = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.hubUrl) {
      this.initSignalRConnection();
    }
  }

  createUser(userData: IUser): Observable<ApiResponse<ICreateUserResponseData>> {
    return this.http.post<ApiResponse<ICreateUserResponseData>>(
      `${this.apiUrl}/users`,
      userData
    );
  }

  private initSignalRConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
      })
      .withAutomaticReconnect()
      .build();

      
    this.hubConnection.on('ReceiveUserUpdate', (user: IUser) => {
      this.userUpdatedSource.next(user);
    });
  }

  public startConnection(): void {
    if (!this.hubConnection || this.hubConnection.state === signalR.HubConnectionState.Connected) {
      return;
    }

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected successfully.');
        this.isConnected.set(true);
      })
      .catch((err) => {
        console.error('Error while starting SignalR connection: ', err);
        this.isConnected.set(false);
        setTimeout(() => this.startConnection(), 5000);
      });
  }

  public stopConnection(): void {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.stop().then(() => {
        console.log('SignalR Connection stopped.');
        this.isConnected.set(false);
      });
    }
  }
}