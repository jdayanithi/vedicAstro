import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

interface RemedySection {
  title: string;
  type: string;
  content: string[];
}

interface Remedy {
  title: string;
  subtitle: string;
  tags: string[];
  sections: RemedySection[];
  benefits: string;
  warning?: string;
  important?: string;
  expanded?: boolean;
}

interface Category {
  key: string;
  icon: string;
  title: string;
  remedies: Remedy[];
}

interface SearchResult {
  title: string;
  subtitle: string;
  categoryTitle: string;
  categoryColor: string;
  matchingTags: string[];
  benefits: string;
  remedy: Remedy;
  category: Category;
}

@Component({
  selector: 'app-tantrik-pariharam',
  templateUrl: './tantrik-pariharam.page.html',
  styleUrls: ['./tantrik-pariharam.page.scss'],
})
export class TantrikPariharamPage implements OnInit {
  isBookmarked = false;
  showCategoryView = true;
  selectedCategory: Category | null = null;
  searchTerm = '';
  searchResults: SearchResult[] = [];

  categories: Category[] = [
    {
      key: 'debt',
      icon: '💰',
      title: 'கடன் தீர்வு',
      remedies: [
        {
          title: '1. உச்சரிக்கும் பரிகாரம்',
          subtitle: 'மன நிலையை மாற்றி பண வரவை ஈர்க்கும் முறை',
          tags: ['கடன்', 'பணம்', 'மன அமைதி', 'நேர்மறை சிந்தனை', 'debt', 'money', 'mental peace', 'positive thinking'],
          sections: [
            {
              title: '📋 செய்முறை',
              type: 'method',
              content: [
                'ரோஜா நாட்களில் காலை 5 மணிக்கு எழுந்து குளிக்க வேண்டும்',
                '"நான் பணக்காரன், எனக்கு பணம் நிறைய இருக்கிறது" என்று மனதில் உறுதியாக நினைக்க வேண்டும்',
                'கோவிலில் சென்று விளக்கேற்றி வழிபட வேண்டும்',
                'ரோஜா நாட்களில் நோன்பு இருக்க வேண்டும்'
              ]
            }
          ],
          benefits: '💫 மன நிலை மாறும், பணம் வர ஆரம்பிக்கும், நம்பிக்கை பிறக்கும்',
          warning: 'நம்பிக்கையுடன் செய்ய வேண்டும். சந்தேகம் வந்தால் பலன் கிடைக்காது.'
        },
        {
          title: '2. நாணய பரிகாரம்',
          subtitle: '108 ரூபாய் நாணயங்களை கொண்ட பரிகாரம்',
          tags: ['கடன்', '108 நாணயம்', 'மஞ்சள்', 'உப்பு', 'debt', 'coins', 'turmeric', 'salt'],
          sections: [
            {
              title: '🛍️ தேவையான பொருட்கள்',
              type: 'method',
              content: [
                '108 ஒரு ரூபாய் நாணயங்கள்',
                'மஞ்சள் (Turmeric)',
                'உப்பு (Salt)'
              ]
            },
            {
              title: '⏰ நேரம் மற்றும் இடம்',
              type: 'method',
              content: [
                'முதல் ஞாயிற்றுக்கிழமை அல்லது பிறந்தநாள்',
                'சூரிய உதயத்திற்கு முன்',
                'கடல், ஆறு அல்லது நதி அருகில்',
                'வடக்கு அல்லது கிழக்கு திசையை நோக்கி'
              ]
            },
            {
              title: '📋 செய்முறை',
              type: 'method',
              content: [
                'முதலில் குளித்து சுத்தமாக இருக்க வேண்டும்',
                '108 நாணயங்களை மஞ்சள், உப்பு கலந்த நீரில் முன்னிரவு சுத்தம் செய்ய வேண்டும்',
                'ஒவ்வொரு நாணயத்தையும் தலைக்கு மேல் 3 முறை சுற்றி கீழே போட வேண்டும்',
                'விநாயகரை வழிபட்டு வர வேண்டும்'
              ]
            }
          ],
          benefits: '🎯 200% பலன் கிடைக்கும். நம்பிக்கையுடன் செய்தால் பிரச்சனைக்குத் தீர்வு வரும்'
        },
        {
          title: '3. நவ தானியப் பரிகாரம்',
          subtitle: 'கிரக தோஷம் நீக்கும் முறை',
          tags: ['கடன்', 'நவ தானியம்', 'கிரக தோஷம்', 'பணம்', 'முளைப்பாரி', 'debt', 'nine grains', 'planetary dosham', 'money', 'sprouting'],
          sections: [
            {
              title: '🌾 நவ தானியங்கள்',
              type: 'method',
              content: [
                'கோதுமை, நெல், துவரை, பாசிப்பயறு',
                'கொண்டைக்கடலை, மொச்சை, எள்',
                'உளுந்து, கொள்ளு'
              ]
            },
            {
              title: '📋 செய்முறை',
              type: 'method',
              content: [
                'வலது கையில் ஒரு கைப்பிடி நவ தானியங்களை எடுக்க வேண்டும்',
                'வடக்கு திசையை நோக்கி நிற்க வேண்டும்',
                'தலைக்கு மேல் இடமிருந்து வலமாக 9 முறை சுற்ற வேண்டும்',
                'ஒரு பாத்திரத்தில் போட வேண்டும்'
              ]
            },
            {
              title: '🌱 முளைப்பாரி',
              type: 'method',
              content: [
                'ஒரு சட்டியில் மணல் இட்டு தானியங்களைப் போட வேண்டும்',
                '3 நாட்களில் முளைக்க வேண்டும்',
                'முளைத்த பிறகு சுத்தமான இடத்தில் போட வேண்டும்'
              ]
            }
          ],
          benefits: '✨ நவகிரக தோஷம் விலகும், கடன் தீரும், பணப்புழக்கம் சீராகும்'
        }
      ]
    },
    {
      key: 'health',
      icon: '🏥',
      title: 'நோய் நிவாரணம்',
      remedies: [
        {
          title: '1. குளிக்கும் முறை பரிகாரம்',
          subtitle: 'சிவபெருமானின் அருளைப் பெற சிறப்பு குளியல் முறை',
          tags: ['நோய்', 'குளியல்', 'சிவன்', 'அருள்', 'health', 'bathing', 'shiva', 'blessing'],
          sections: [
            {
              title: '🛍️ தேவையான பொருட்கள்',
              type: 'method',
              content: [
                'வெள்ளை எள் - 1 கைப்பிடி',
                'கடுகு - 1 தேக்கரண்டி',
                'புங்கன் இலை - 7 இலைகள்',
                'தீபம் ஏற்ற எண்ணெய்'
              ]
            },
            {
              title: '📋 செய்முறை',
              type: 'method',
              content: [
                'திங்கட்கிழமை அன்று காலை 5 மணிக்கு எழுந்து',
                'அனைத்து பொருட்களையும் தண்ணீரில் கலக்க வேண்டும்',
                'சிவனை வழிபட்டு விட்டு குளிக்க வேண்டும்',
                '21 நாட்கள் தொடர்ந்து செய்ய வேண்டும்'
              ]
            }
          ],
          benefits: '🕉️ அனைத்து வகை நோய்களும் குணமாகும், சிவனின் அருள் கிடைக்கும்'
        }
      ]
    },
    {
      key: 'prosperity',
      icon: '🌟',
      title: 'செல்வம் & வளர்ச்சி',
      remedies: [
        {
          title: '1. தடை நீக்க இஞ்சி பரிகாரம்',
          subtitle: 'விரைவில் பணம் வர இஞ்சியைக் கொண்ட அற்புத பரிகாரம்',
          tags: ['இஞ்சி', 'பணம்', 'தடை நீக்கம்', 'செல்வம்', 'ginger', 'money', 'obstacle removal', 'prosperity'],
          sections: [
            {
              title: '🛍️ தேவையான பொருட்கள்',
              type: 'method',
              content: [
                'புதிய இஞ்சி - 1 துண்டு',
                'மஞ்சள் தூள்',
                'குங்குமம்',
                'வெள்ளி நாணயம் அல்லது வெள்ளி வளையல்'
              ]
            },
            {
              title: '📋 செய்முறை',
              type: 'method',
              content: [
                'வெள்ளிக்கிழமை அன்று காலை எழுந்து',
                'இஞ்சியில் மஞ்சள், குங்குமம் தடவ வேண்டும்',
                'பணப்பையில் வெள்ளி நாணயத்துடன் வைக்க வேண்டும்',
                '7 நாட்கள் கழித்து மாற்ற வேண்டும்'
              ]
            }
          ],
          benefits: '💸 விரைவில் பணம் வரும், தடைகள் விலகும், வியாபாரம் நன்றாக நடக்கும்'
        },
        {
          title: '2. பணப்பையில் வைக்கும் பரிகாரம்',
          subtitle: 'பணப்பையில் வைத்து செல்ல வேண்டிய சிறப்பு பொருட்கள்',
          tags: ['பணப்பை', 'செல்வம்', 'லட்சுமி', 'காசு', 'wallet', 'wealth', 'lakshmi', 'money'],
          sections: [
            {
              title: '🛍️ பணப்பையில் வைக்க வேண்டியவை',
              type: 'method',
              content: [
                'கோமதி சக்கரம் - 1',
                'ஸ்ரீ யந்திரம் - சிறிய அளவு',
                'மஞ்சள் துண்டு',
                'துளசி இலை - உலர்ந்தது'
              ]
            },
            {
              title: '📋 விதிகள்',
              type: 'method',
              content: [
                'வெள்ளிக்கிழமை அன்று பணப்பையில் வைக்க வேண்டும்',
                'ஒவ்வொரு மாதமும் புதுப்பிக்க வேண்டும்',
                'பணப்பையை சுத்தமாக வைக்க வேண்டும்',
                'கிழிந்த நோட்டுகளை வைக்கக் கூடாது'
              ]
            }
          ],
          benefits: '💰 எப்போதும் பணம் இருக்கும், வருமானம் அதிகரிக்கும், லட்சுமி கடாட்சம் கிடைக்கும்'
        }
      ]
    },
    {
      key: 'career',
      icon: '🏛️',
      title: 'அரசு வேலை வெற்றி',
      remedies: [
        {
          title: '1. அரசு வேலை பரிகாரம்',
          subtitle: 'அரசு வேலை கிடைக்க சிறப்பு பரிகார முறை',
          tags: ['அரசு வேலை', 'வெற்றி', 'தேர்வு', 'சனி', 'government job', 'success', 'exam', 'saturn'],
          sections: [
            {
              title: '🛍️ தேவையான பொருட்கள்',
              type: 'method',
              content: [
                'கருப்பு எள் - 1 கப்',
                'இரும்பு பாத்திரம்',
                'சனிக்கிழமை வேப்ப எண்ணெய்',
                'கருப்பு எள் உண்டைகள்'
              ]
            },
            {
              title: '📋 செய்முறை',
              type: 'method',
              content: [
                'சனிக்கிழமை அன்று காலை எழுந்து',
                'ஹனுமான் கோவிலில் சென்று',
                'கருப்பு எள்ளை தலைக்கு மேல் 7 முறை சுற்றி',
                'வேப்ப எண்ணெய் தீபம் ஏற்ற வேண்டும்'
              ]
            }
          ],
          benefits: '🎯 அரசு வேலை கிடைக்கும், தேர்வில் வெற்றி பெறுவீர்கள், சனி தோஷம் விலகும்'
        }
      ]
    }
  ];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
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
      const index = bookmarks.indexOf('tantrik_001');
      if (index > -1) {
        bookmarks.splice(index, 1);
      }
      this.isBookmarked = false;
      await this.showToast('Bookmark removed', 'warning');
    } else {
      bookmarks.push('tantrik_001');
      this.isBookmarked = true;
      await this.showToast('Bookmarked successfully', 'success');
    }
    
    localStorage.setItem('bookmarkedConcepts', JSON.stringify(bookmarks));
  }

  selectCategory(categoryKey: string) {
    this.selectedCategory = this.categories.find(cat => cat.key === categoryKey) || null;
    this.showCategoryView = false;
  }

  goBack() {
    this.showCategoryView = true;
    this.selectedCategory = null;
    this.searchTerm = '';
    this.searchResults = [];
  }

  toggleRemedy(remedy: Remedy) {
    remedy.expanded = !remedy.expanded;
  }

  searchRemedies(event: any) {
    const query = event.detail.value.toLowerCase().trim();
    this.searchResults = [];

    if (query.length < 2) {
      return;
    }

    this.categories.forEach(category => {
      category.remedies.forEach(remedy => {
        const matchingTags = remedy.tags.filter(tag => 
          tag.toLowerCase().includes(query)
        );

        if (matchingTags.length > 0 || 
            remedy.title.toLowerCase().includes(query) ||
            remedy.subtitle.toLowerCase().includes(query) ||
            remedy.benefits.toLowerCase().includes(query)) {
          
          this.searchResults.push({
            title: remedy.title,
            subtitle: remedy.subtitle,
            categoryTitle: category.title,
            categoryColor: this.getCategoryColor(category.key),
            matchingTags: matchingTags,
            benefits: remedy.benefits,
            remedy: remedy,
            category: category
          });
        }
      });
    });
  }

  selectSearchResult(result: SearchResult) {
    this.selectedCategory = result.category;
    this.showCategoryView = false;
    this.searchTerm = '';
    this.searchResults = [];
    
    // Expand the selected remedy
    result.remedy.expanded = true;
  }

  getCategoryColor(categoryKey: string): string {
    const colorMap: { [key: string]: string } = {
      'debt': 'success',
      'health': 'danger',
      'prosperity': 'warning',
      'career': 'tertiary'
    };
    return colorMap[categoryKey] || 'medium';
  }

  async bookConsultation() {
    const alert = await this.alertController.create({
      header: 'நிபுணர் ஆலோசனை',
      message: 'விரைவில் இந்த சேவை கிடைக்கும். கூடுதல் விவரங்களுக்கு தொடர்பில் இருங்கள்.',
      buttons: ['சரி']
    });
    await alert.present();
  }

  async shareContent() {
    try {
      if ('share' in navigator) {
        await (navigator as any).share({
          title: 'தந்திர பரிகாரம் - Tantrik Pariharam',
          text: 'வேத சாஸ்திரங்களின் ரகসிய அம்சமான தந்திர பரிகாரங்கள்',
          url: window.location.href,
        });
      } else {
        await this.showToast('Content link copied to clipboard', 'success');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}
