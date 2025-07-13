import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { FeatureFlagService, FeatureFlags } from '../../services/feature-flag.service';
import { CopyProtectionService } from '../../services/copy-protection.service';

@Component({
  selector: 'app-feature-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDividerModule
  ],
  templateUrl: './feature-settings.component.html',
  styleUrls: ['./feature-settings.component.scss']
})
export class FeatureSettingsComponent implements OnInit {

  currentFlags: FeatureFlags = {
    enableCopyPaste: false,
    enableRightClick: false,
    enableTextSelection: false,
    enableDevTools: false,
    enableKeyboardShortcuts: true,
    enableScreenshotProtection: true
  };

  constructor(
    private featureFlagService: FeatureFlagService,
    private copyProtectionService: CopyProtectionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCurrentFlags();
  }

  private loadCurrentFlags(): void {
    this.currentFlags = this.featureFlagService.getCurrentFlags();
  }

  onToggleFeature(feature: keyof FeatureFlags, enabled: boolean): void {
    this.featureFlagService.setFeatureFlag(feature, enabled);
    this.currentFlags = this.featureFlagService.getCurrentFlags();
    
    // Update copy protections to reflect the new settings
    this.copyProtectionService.updateProtections();
    
    this.showSuccessMessage(`${this.getFeatureDisplayName(feature)} ${enabled ? 'enabled' : 'disabled'}`);
  }

  resetToDefaults(): void {
    this.featureFlagService.resetToDefaults();
    this.loadCurrentFlags();
    this.copyProtectionService.updateProtections();
    this.showSuccessMessage('Settings reset to defaults');
  }

  private getFeatureDisplayName(feature: keyof FeatureFlags): string {
    const displayNames: Record<keyof FeatureFlags, string> = {
      enableCopyPaste: 'Copy & Paste',
      enableRightClick: 'Right Click',
      enableTextSelection: 'Text Selection',
      enableDevTools: 'Developer Tools',
      enableKeyboardShortcuts: 'Keyboard Shortcuts',
      enableScreenshotProtection: 'Screenshot Protection'
    };
    return displayNames[feature];
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  // Helper methods to get status text
  getStatusText(enabled: boolean): string {
    return enabled ? 'Enabled' : 'Disabled';
  }

  getStatusColor(enabled: boolean): string {
    return enabled ? 'primary' : 'warn';
  }
}
