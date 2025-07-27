import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tantrik-pariharam',
  templateUrl: './tantrik-pariharam.page.html',
  styleUrls: ['./tantrik-pariharam.page.scss'],
})
export class TantrikPariharamPage implements OnInit {
  isBookmarked = false;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.checkBookmarkStatus();
  }

  checkBookmarkStatus() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    this.isBookmarked = bookmarks.includes('tantrik_001');
  }

  async toggleBookmark() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedConcepts') || '[]');
    
    if (this.isBookmarked) {
      // Remove bookmark
      const index = bookmarks.indexOf('tantrik_001');
      if (index > -1) {
        bookmarks.splice(index, 1);
      }
      this.isBookmarked = false;
      await this.showToast('Bookmark removed', 'warning');
    } else {
      // Add bookmark
      bookmarks.push('tantrik_001');
      this.isBookmarked = true;
      await this.showToast('Bookmarked successfully', 'success');
    }
    
    localStorage.setItem('bookmarkedConcepts', JSON.stringify(bookmarks));
  }

  async openPariharam(pariharamId: string) {
    let title = '';
    let content = '';

    switch (pariharamId) {
      case 'debt-relief':
        title = 'கடன் தீர்வு பரिகாரங்கள்';
        content = this.getDebtReliefContent();
        break;
      case 'bathing-remedy':
        title = 'குளிக்கும் முறை பரிகாரம்';
        content = this.getBathingRemedyContent();
        break;
      case 'ginger-remedy':
        title = 'தடை நீக்க இஞ்சி பரிகாரம்';
        content = this.getGingerRemedyContent();
        break;
      case 'wallet-remedy':
        title = 'பணப்பை பரிகாரம்';
        content = this.getWalletRemedyContent();
        break;
      case 'government-remedy':
        title = 'அரசு காரிய வெள்ளெருக்கு பரிகாரம்';
        content = this.getGovernmentRemedyContent();
        break;
      default:
        return;
    }

    const alert = await this.alertController.create({
      header: title,
      message: content,
      cssClass: 'pariharam-detail-alert',
      buttons: [
        {
          text: 'மூடு',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  async shareContent() {
    try {
      // Use Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'தந்திர பரிகாரம் - Tantrik Pariharam',
          text: 'வேத சாஸ்திரங்களின் ரகசிய அம்சமான தந்திர பரிகாரங்கள்',
          url: window.location.href,
        });
      } else {
        // Fallback to copying URL
        await navigator.clipboard.writeText(window.location.href);
        await this.showToast('Link copied to clipboard', 'success');
      }
    } catch (error) {
      console.log('Error sharing:', error);
      await this.showToast('Sharing not available', 'warning');
    }
  }

  async bookConsultation() {
    const alert = await this.alertController.create({
      header: 'நிபுணர் ஆலோசனை',
      subHeader: 'Tantrik Remedies Consultation',
      message: 'தந்திர பரிகாரங்களுக்கான விரிவான ஆலோசனைக்கு எங்களை தொடர்பு கொள்ளுங்கள்.',
      buttons: [
        {
          text: 'WhatsApp',
          handler: () => {
            window.open('https://wa.me/1234567890?text=தந்திர பரிகாரம் பற்றி அறிய விரும்புகிறேன்', '_blank');
          }
        },
        {
          text: 'Call',
          handler: () => {
            window.open('tel:+1234567890', '_self');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
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

  getDebtReliefContent(): string {
    return `
      <div class="tamil-text">
        <h3>1. உச்சரிக்கும் பரிகாரம்</h3>
        <p>• கடன் அடைய வேண்டும் என்று சொல்லக்கூடாது</p>
        <p>• எனக்குப் பணம் தேவை, பணம் சேர வேண்டும் என்று சொல்லவும்</p>
        <p>• நேர்மறையாகச் சிந்தித்தால், நேர்மறையே நடக்கும்</p>
        
        <h3>2. 108 Rs.1 coins பரிகாரம்</h3>
        <p>• 108 ஒரு ரூபாய் நாணயங்கள், மஞ்சள், உப்பு</p>
        <p>• முதல் ஞாயிற்றுக்கிழமை, சூரிய உதயத்திற்கு முன்</p>
        <p>• கடல்/ஆறு அருகில், வடக்கு/கிழக்கு நோக்கி</p>
        <p>• ஒவ்வொரு நாணயமும் 3 முறை சுற்றி கீழே போடவும்</p>
        
        <h3>3. நவ தானியப் பரிகாரம்</h3>
        <p>• 9 வகை தானியங்கள் வடக்கு நோக்கி 9 முறை சுற்றவும்</p>
        <p>• சட்டியில் மணல்விட்டு 3 நாட்கள் முளைக்க வைக்கவும்</p>
        <p>• அரச மரத்தடியில் போடவும்</p>
        
        <h3>4. பச்சரிசி மாவு பரிகாரம்</h3>
        <p>• பச்சரிசி மாவு + சர்க்கரை கலவை</p>
        <p>• திங்கள் முதல், கோவில்/அரச மரம் 3 முறை சுற்றவும்</p>
        <p>• 48 நாட்கள் தொடர்ந்து செய்யவும்</p>
      </div>
    `;
  }

  getBathingRemedyContent(): string {
    return `
      <div class="tamil-text">
        <h3>குளிக்கும் முறை பரிகாரம்</h3>
        
        <h4>திசை:</h4>
        <p>• வடக்கு அல்லது கிழக்கு திசை நோக்கி குளிக்கவும்</p>
        <p>• நோய்களைத் தவிர்க்கலாம், அதிக பணம் சம்பாதிக்கலாம்</p>
        
        <h4>நீர் ஊற்றும் வரிசை:</h4>
        <p>1. கால்கள் (Legs)</p>
        <p>2. வயிறு (Stomach)</p>
        <p>3. தோள்பட்டை (Shoulder)</p>
        <p>4. கடைசியாக தலை (Head)</p>
        
        <h4>முக்கிய குறிப்பு:</h4>
        <p>• முதலில் தலையில் தண்ணீர் ஊற்றக் கூடாது</p>
        <p>• பௌர்ணமி அன்று தொடங்கவும்</p>
        <p>• உடல் வெப்பநிலை சமநிலை பராமரிக்கப்படும்</p>
      </div>
    `;
  }

  getGingerRemedyContent(): string {
    return `
      <div class="tamil-text">
        <h3>தடை நீக்க இஞ்சி பரிகாரம்</h3>
        
        <h4>பரிகாரம் செய்யும் முறை:</h4>
        <p>• இஞ்சி வாங்கும்போது பேரம் பேசக்கூடாது</p>
        <p>• எந்த நேரத்திலும் செய்யலாம்</p>
        <p>• வடக்கு திசை நோக்கி நிற்கவும்</p>
        
        <h4>செய்முறை:</h4>
        <p>1. இஞ்சியை கையில் வைத்துக்கொள்ளவும்</p>
        <p>2. இடமிருந்து வலமாக 9 முறை தலையைச் சுற்றவும்</p>
        <p>3. ஆள் நடமாட்டம் இல்லாத இடத்தில் உடைத்துவிடவும்</p>
        <p>4. வீட்டிற்கு வந்து குளித்துக்கொள்ளவும்</p>
        
        <h4>பலன்கள்:</h4>
        <p>• தடை, திருஷ்டி நீங்கும்</p>
        <p>• மனக்கஷ்டங்கள் போகும்</p>
        <p>• குழந்தைகள் அழுவதையும் நிறுத்தும்</p>
      </div>
    `;
  }

  getWalletRemedyContent(): string {
    return `
      <div class="tamil-text">
        <h3>பணப்பை பரிகாரம்</h3>
        
        <h4>பணத்தை வைத்திருக்கும் முறை:</h4>
        <p>• பண நோட்டுகளை மடிக்கக் கூடாது</p>
        <p>• மூலைகளை மடக்காமல் வைக்கவும்</p>
        <p>• சுருட்டி வைக்கலாம்</p>
        <p>• சரியான வரிசையில் அடுக்கி வைக்கவும்</p>
        
        <h4>சேர்க்க வேண்டியவை:</h4>
        <p>• பச்சை கற்பூரம் ஒரு துண்டு</p>
        <p>• மரிக்கொழுந்து/ஜவ்வாது/ஏலக்காய் வாசனை</p>
        <p>• ஃபெஹு சின்னம் வரையலாம்</p>
        <p>• புதிய பண நோட்டுகள் வைக்கவும்</p>
        
        <h4>சுத்தப்படுத்தும் முறை:</h4>
        <p>• 2 வாரம்/1 மாதத்திற்கு ஒருமுறை</p>
        <p>• மஞ்சள் + உப்பு கலந்த நீரில் சுத்தம்</p>
        <p>• தேவையற்ற காகிதங்கள் நீக்கவும்</p>
        
        <h4>பலன்:</h4>
        <p>• பண வரவு அதிகரிக்கும்</p>
        <p>• செல்வம் ஈர்க்கும் சக்தி கிடைக்கும்</p>
      </div>
    `;
  }

  getGovernmentRemedyContent(): string {
    return `
      <div class="tamil-text">
        <h3>அரசு காரிய வெள்ளெருக்கு பரிகாரம்</h3>
        
        <h4>முறை 1: வெள்ளெருக்கு விநாயகர் வழிபாடு</h4>
        <p>• வெள்ளெருக்கு விநாயகர் சிலையைத் தேர்வு செய்யவும்</p>
        <p>• சுத்தமாகப் பெருக்கி வைக்கவும்</p>
        <p>• மனமுருகி பிரார்த்தனை செய்யவும்</p>
        <p>• அரசு தொடர்பான காரியங்கள் கைகூடும்</p>
        
        <h4>முறை 2: வெள்ளெருக்கு பூ பயன்பாடு</h4>
        <p>• வெள்ளெருக்கு பூவை எடுத்துக்கொள்ளவும்</p>
        <p>• நெஞ்சருகே வைத்துப் பிரார்த்திக்கவும்</p>
        <p>• பையில் வைத்துக்கொண்டு செல்லவும்</p>
        <p>• அரசு தொடர்பான செயலுக்குச் செல்லவும்</p>
        
        <h4>பலன்கள்:</h4>
        <p>• அரசு வேலை கிடைக்கும்</p>
        <p>• அரசுத் தேர்வில் வெற்றி</p>
        <p>• அரசு காரியங்களில் தடையின்றி முன்னேற்றம்</p>
      </div>
    `;
  }
}
