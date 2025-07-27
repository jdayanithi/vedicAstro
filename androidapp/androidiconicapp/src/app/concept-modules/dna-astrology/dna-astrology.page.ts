import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dna-astrology',
  templateUrl: './dna-astrology.page.html',
  styleUrls: ['./dna-astrology.page.scss'],
})
export class DnaAstrologyPage implements OnInit {
  isBookmarked = false;

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    // Check if this concept is bookmarked
    this.checkBookmarkStatus();
  }

  checkBookmarkStatus() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    this.isBookmarked = bookmarks.includes('dna_astrology_001');
  }

  async toggleBookmark() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    
    if (this.isBookmarked) {
      // Remove bookmark
      const index = bookmarks.indexOf('dna_astrology_001');
      if (index > -1) {
        bookmarks.splice(index, 1);
      }
      this.isBookmarked = false;
      await this.showToast('Bookmark removed', 'warning');
    } else {
      // Add bookmark
      bookmarks.push('dna_astrology_001');
      this.isBookmarked = true;
      await this.showToast('Bookmarked successfully', 'success');
    }
    
    localStorage.setItem('bookmarkedConcepts', JSON.stringify(bookmarks));
  }

  async shareContent() {
    try {
      // Use Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'DNA ஜோதிஷம் - DNA Astrology',
          text: 'மரபணு அறிவியலுடன் இணைந்த நவீன ஜோதிட ஆராய்ச்சி மற்றும் கணிப்புகள்',
          url: window.location.href
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        await this.showToast('Link copied to clipboard', 'success');
      }
    } catch (error) {
      console.log('Error sharing:', error);
      await this.showToast('Sharing not available', 'warning');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}
