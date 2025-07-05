import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NetworkStatusService } from '../../service/network-status.service';

export interface OfflineDialogData {
  title: string;
  message: string;
  isInitial: boolean;
}

@Component({
  selector: 'app-offline-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="offline-dialog">
      <div class="dialog-header">
        <mat-icon class="offline-icon">wifi_off</mat-icon>
        <h2 mat-dialog-title>{{data.title}}</h2>
      </div>
      
      <mat-dialog-content class="dialog-content">
        <div class="connection-status">
          <div class="status-indicator offline-indicator">
            <div class="pulse-ring"></div>
            <div class="pulse-ring pulse-ring-delay"></div>
            <mat-icon>signal_wifi_off</mat-icon>
          </div>
          
          <div class="status-text">
            <h3>Connection Status</h3>
            <p class="status-label offline">Offline</p>
          </div>
        </div>
        
        <div class="message-section">
          <p class="dialog-message">{{data.message}}</p>
          
          <div class="offline-features">
            <h4>What you can do offline:</h4>
            <ul>
              <li *ngFor="let capability of offlineCapabilities">
                <mat-icon>book</mat-icon>
                <span>{{capability}}</span>
              </li>
            </ul>
          </div>
          
          <div class="limitations">
            <h4>Limited functionality:</h4>
            <ul>
              <li *ngFor="let limitation of offlineLimitations">
                <mat-icon>cloud_off</mat-icon>
                <span>{{limitation}}</span>
              </li>
            </ul>
          </div>
        </div>
      </mat-dialog-content>
      
      <mat-dialog-actions class="dialog-actions">
        <div class="action-buttons">
          <button 
            mat-raised-button 
            color="primary" 
            (click)="retryConnection()"
            [disabled]="isRetrying"
            class="retry-button">
            <mat-icon *ngIf="!isRetrying">refresh</mat-icon>
            <mat-icon *ngIf="isRetrying" class="spinning">sync</mat-icon>
            {{isRetrying ? 'Checking...' : 'Retry Connection'}}
          </button>
          
          <button 
            mat-stroked-button 
            (click)="continueOffline()"
            class="continue-button">
            <mat-icon>offline_bolt</mat-icon>
            Continue Offline
          </button>
        </div>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .offline-dialog {
      max-width: 400px;
      font-family: 'Roboto', sans-serif;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f0f0;
    }

    .offline-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #f44336;
    }

    h2 {
      margin: 0;
      color: #333;
      font-weight: 600;
    }

    .dialog-content {
      padding: 0 !important;
    }

    .connection-status {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 25px;
      padding: 20px;
      background: #fff5f5;
      border-radius: 10px;
      border-left: 4px solid #f44336;
    }

    .status-indicator {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
    }

    .pulse-ring {
      position: absolute;
      width: 60px;
      height: 60px;
      border: 2px solid #f44336;
      border-radius: 50%;
      animation: pulse 2s ease-out infinite;
      opacity: 0.6;
    }

    .pulse-ring-delay {
      animation-delay: 1s;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 0.6;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    .status-indicator mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #f44336;
      z-index: 1;
    }

    .status-text h3 {
      margin: 0 0 5px 0;
      font-size: 1rem;
      color: #666;
    }

    .status-label {
      font-weight: 600;
      font-size: 1.1rem;
      margin: 0;
    }

    .status-label.offline {
      color: #f44336;
    }

    .message-section {
      margin-bottom: 20px;
    }

    .dialog-message {
      font-size: 1rem;
      line-height: 1.5;
      color: #555;
      margin-bottom: 20px;
    }

    .offline-features,
    .limitations {
      margin-bottom: 20px;
    }

    .offline-features h4,
    .limitations h4 {
      font-size: 0.95rem;
      margin: 0 0 10px 0;
      color: #333;
      font-weight: 600;
    }

    .offline-features ul,
    .limitations ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .offline-features li,
    .limitations li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      font-size: 0.9rem;
      color: #666;
    }

    .offline-features li mat-icon {
      color: #4caf50;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .limitations li mat-icon {
      color: #ff9800;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .dialog-actions {
      padding: 20px 0 0 0 !important;
      border-top: 1px solid #e0e0e0;
      margin: 0;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      width: 100%;
    }

    .retry-button,
    .continue-button {
      flex: 1;
      height: 48px;
      font-weight: 600;
      border-radius: 8px;
    }

    .retry-button {
      background: linear-gradient(45deg, #4caf50, #45a049);
      color: white;
    }

    .retry-button:hover {
      background: linear-gradient(45deg, #45a049, #3d8b40);
    }

    .continue-button {
      border: 2px solid #2196f3;
      color: #2196f3;
    }

    .continue-button:hover {
      background: rgba(33, 150, 243, 0.1);
    }

    .retry-button mat-icon,
    .continue-button mat-icon {
      margin-right: 8px;
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @media (max-width: 480px) {
      .offline-dialog {
        max-width: 90vw;
      }
      
      .action-buttons {
        flex-direction: column;
      }
      
      .retry-button,
      .continue-button {
        width: 100%;
      }
    }
  `]
})
export class OfflineDialogComponent {
  offlineCapabilities: string[] = [];
  offlineLimitations: string[] = [];
  isRetrying = false;

  constructor(
    public dialogRef: MatDialogRef<OfflineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OfflineDialogData,
    private networkService: NetworkStatusService
  ) {
    this.offlineCapabilities = this.networkService.getOfflineCapabilities();
    this.offlineLimitations = this.networkService.getOfflineLimitations();
  }

  async retryConnection(): Promise<void> {
    this.isRetrying = true;
    
    try {
      const isConnected = await this.networkService.retryConnection();
      if (isConnected) {
        this.dialogRef.close('connected');
      } else {
        // Show message that connection is still not available
        console.log('Connection retry failed');
      }
    } catch (error) {
      console.error('Retry connection error:', error);
    } finally {
      this.isRetrying = false;
    }
  }

  continueOffline(): void {
    this.dialogRef.close('continue');
  }
}
