/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Testimonial, GalleryItem, CommunityEvent } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'espresso-solo',
    name: 'اسپرسو دست‌ساز تک‌شات',
    description: 'دو شات اسپرسو از ترکیب اختصاصی کافه‌نو با کرمای غلیظ فندقی رنگ. پیچیده، گلی و فوق‌العاده لذت‌بخش.',
    category: 'drinks',
    subCategory: 'اسپرسو بار',
    price: 3.50,
    image: '/src/assets/images/espresso_shot_card_1781544668671.jpg',
    rating: 4.9,
    tags: ['پرفروش‌ترین', 'کافئین بالا'],
    isBestSeller: true,
    ingredients: ['اسپرسو دو شات تک‌خاستگاه', 'عشق باریستا'],
    nutritionalInfo: { calories: 5, caffeine: 'بسیار بالا' }
  },
  {
    id: 'cappuccino-rosette',
    name: 'کاپوچینوی مخملی کلاسیک',
    description: 'تعادل ایده‌آل اسپرسوی غلیظ، شیر بخارپز شده و لایه فوم لطیف میکرو؛ تزیین شده با لاته آرت سفارشی رُز.',
    category: 'drinks',
    subCategory: 'اسپرسو بار',
    price: 4.50,
    image: '/src/assets/images/cappuccino_foam_card_1781544697580.jpg',
    rating: 4.8,
    tags: ['سنتی', 'دست‌ساز'],
    isBestSeller: true,
    ingredients: ['اسپرسو', 'شیر کامل محلی', 'میکروفوم متراکم'],
    nutritionalInfo: { calories: 120, caffeine: 'بالا' }
  },
  {
    id: 'iced-matcha-latte',
    name: 'لاته ماچا تشریفاتی برفی',
    description: 'ماچا درجه یک یوجی ترکیب‌شده با شیر تازه و ارگانیک خنک روی یخ، همراه با طرح‌های ابر و بادی پاستلی و طعمی خنک.',
    category: 'drinks',
    subCategory: 'نوشیدنی‌های خنک',
    price: 5.20,
    image: '/src/assets/images/iced_matcha_latte_card_1781544684435.jpg',
    rating: 4.9,
    tags: ['ویژه فصلی', 'پرانرژی', 'صد درصد گیاهی'],
    isSeasonal: true,
    ingredients: ['ماچای تشریفاتی عالی ژاپنی', 'شیر خنک گیاهی', 'شربت آگاو ارگانیک'],
    nutritionalInfo: { calories: 140, caffeine: 'متوسط' }
  },
  {
    id: 'croissant-classic',
    name: 'کرواسان طلایی ترد و پر لایه',
    description: 'پخته شده به صورت روزانه؛ کرواسان چند لایه با کره فرانسوی، بافتی سبک و ترد و مغز نرم لانه زنبوری مغذی.',
    category: 'bakery',
    subCategory: 'شیرینی‌پزی آرتیزان',
    price: 3.90,
    image: '/src/assets/images/croissant_pastry_card_1781544714538.jpg',
    rating: 4.7,
    tags: ['پیشنهاد سرآشپز', 'پخت روز'],
    isBestSeller: true,
    ingredients: ['آرد سنگ‌کوب بی‌رنگ', 'کره فرانسوی عالی', 'مایه خمیر فعال'],
    nutritionalInfo: { calories: 310, caffeine: 'بدون کافئین' }
  },
  {
    id: 'nitro-cold-brew',
    name: 'قهوه سرد نیترو کافه‌نو',
    description: 'مراحل دم‌آوری سرد ۱۸ ساعته و تزریق شده با نیتروژن خوراکی. همراه با ریزش پیاپی و کفی خامه‌ای و غلیظ.',
    category: 'drinks',
    subCategory: 'نوشیدنی‌های خنک',
    price: 4.90,
    image: 'https://picsum.photos/seed/coldbrew/600/450',
    rating: 4.9,
    tags: ['دم‌آوری سرد', 'پرفروش‌ترین'],
    isBestSeller: true,
    ingredients: ['عصاره غلیظ قهوه دم‌سرد', 'حباب‌های نیتروژن فعال', 'یخ بلوری'],
    nutritionalInfo: { calories: 5, caffeine: 'بسیار بالا' }
  },
  {
    id: 'lavender-latte',
    name: 'لاته اختصاصی اسطوخودوس',
    description: 'اسپرسوی نرم دو شات با شربت اسطوخودوس طبیعی خانگی و شیر جو دوسر خامه‌ای، تزیین شده با غنچه‌های ارگانیک اسطوخودوس.',
    category: 'drinks',
    subCategory: 'ویژه‌های فصلی',
    price: 5.50,
    image: 'https://picsum.photos/seed/lavenderlatte/600/450',
    rating: 4.6,
    tags: ['فصلی', 'شیرین و معطر'],
    isSeasonal: true,
    ingredients: ['اسپرسو', 'شیر جو دوسر', 'شربت اسطوخودوس خانگی', 'گل اسطوخودوس خشک'],
    nutritionalInfo: { calories: 160, caffeine: 'بالا' }
  },
  {
    id: 'avocado-sourdough',
    name: 'تست آووکادو آرتیزان',
    description: 'یک اسلایس ضخیم از نان تست خمیرترش ارگانیک، همراه با پوره آووکادو هاس، گوجه گیلاسی، تربچه و پرک فلفل قرمز.',
    category: 'bakery',
    subCategory: 'شیرینی‌پزی آرتیزان',
    price: 8.50,
    image: 'https://picsum.photos/seed/avotoast/600/450',
    rating: 4.8,
    tags: ['غذای سالم', 'گزینه گیاه‌خوار'],
    ingredients: ['نان خمیرترش محلی', 'آووکادو هاس درجه یک', 'گوجه گیلاسی', 'برش‌های تربچه', 'روغن زیتون فرابکر'],
    nutritionalInfo: { calories: 380, caffeine: 'بدون کافئین' }
  },
  {
    id: 'blueberry-muffin',
    name: 'مافین کرامبل بلوبری',
    description: 'مافین مرطوب و نرم تهیه شده با باترمیلک و پر از بلوبری‌های وحشی شیرین، تزیین شده با کرامبل دارچین و شکر قهوه‌ای.',
    category: 'bakery',
    subCategory: 'شیرینی‌پزی آرتیزان',
    price: 3.80,
    image: 'https://picsum.photos/seed/muffin/600/450',
    rating: 4.5,
    tags: ['پخت سنتی', 'پخت روزانه'],
    ingredients: ['بلوبری وحشی دیم', 'باترمیلک تازه', 'آرد گندم غنی‌شده', 'کرامبل کره و دارچین'],
    nutritionalInfo: { calories: 290, caffeine: 'بدون کافئین' }
  },
  {
    id: 'beans-blend-ethiopia',
    name: 'دانه‌های اتیوپی یرگاچف',
    description: 'دانه‌های قهوه برشته‌شده با رایحه بسیار بالا با اسیدیته روشن و نت‌های لطیف چای یاس و هلو تازه.',
    category: 'beans',
    subCategory: 'دانه‌های تک‌خاستگاه',
    price: 18.00,
    image: 'https://picsum.photos/seed/coffeebean/600/450',
    rating: 5.0,
    tags: ['تک‌خاستگاه', 'تولید اختصاصی'],
    ingredients: ['۱۰۰٪ عربیکا شستشو شده', 'رست ملایم-متوسط سنتی'],
    nutritionalInfo: { calories: 0, caffeine: 'بالا' }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'علی دباغ',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alexander',
    role: 'طراح معمار مستقل / مشتری دائمی',
    rating: 5,
    text: 'کافه‌نو تبدیل به فضای کار دوم من شده است. نورپردازی ملایم، چینش هندسی میزها و پریزهای برق عالی تعبیه شده به همراه لاته ماچای فوق‌العاده‌شان کار را لذت‌بخش می‌کند. پیشنهاد ویژه من است!',
    date: '۳ روز پیش'
  },
  {
    id: 't2',
    name: 'نرگس راد',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mia',
    role: 'نویسنده و منتقد کافه‌گردی',
    rating: 5,
    text: 'پیدا کردن یک کرواسان فرانسوی واقعی با بافت چندلایه و ترد در این محله سابقاً غیرممکن بود. کافه‌نو این کار را بی‌نقص انجام می‌دهد. کلوچه بلوبری و لاته آنها ترکیب صبحگاهی بی‌نظیری است.',
    date: '۱ هفته پیش'
  },
  {
    id: 't3',
    name: 'دکتر امین کریمی',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=James',
    role: 'استاد دانشگاه شریف',
    rating: 5,
    text: 'قهوه ترکیبی ویژه خانه بسیار متعادل با پایانی شکلاتی است. پرسنل به شدت صمیمی هستند و به محض ورود فرآیند سفارش مرا آماده می‌کنند. این کیفیت از مهمان‌نوازی در این روزها واقعاً کمیاب است.',
    date: '۲ هفته پیش'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    src: '/src/assets/images/cafeno_hero_bg_1781544644400.jpg',
    alt: 'نمای داخلی کافه‌نو',
    title: 'طراحی هندسی و نشیمن دنج مدرن',
    category: 'interior'
  },
  {
    id: 'g2',
    src: '/src/assets/images/about_cafe_image_1781544730192.jpg',
    alt: 'بخارپز کردن شیر توسط باریستا',
    title: 'دقت هنری در دم‌آوری هر سفارش',
    category: 'moments'
  },
  {
    id: 'g3',
    src: '/src/assets/images/cappuccino_foam_card_1781544697580.jpg',
    alt: 'طرح روی قهوه لاته',
    title: 'هنر لاته طرح رز کلاسیک',
    category: 'coffee'
  },
  {
    id: 'g4',
    src: '/src/assets/images/espresso_shot_card_1781544668671.jpg',
    alt: 'فرآیند عصاره‌گیری قهوه اسپرسو تک شات',
    title: 'کرمای غلیظ طلایی اسپرسو',
    category: 'coffee'
  },
  {
    id: 'g5',
    src: '/src/assets/images/iced_matcha_latte_card_1781544684435.jpg',
    alt: 'شیک ماچا لاته سرد روی یخ',
    title: 'تداخل رنگ‌های طبیعی لاته ماچا',
    category: 'coffee'
  },
  {
    id: 'g6',
    src: '/src/assets/images/croissant_pastry_card_1781544714538.jpg',
    alt: 'کرواسان‌های تازه فرانسوی از فر',
    title: 'کرواسان‌های کره‌ای دست‌ساز',
    category: 'moments'
  },
  {
    id: 'g7',
    src: 'https://picsum.photos/seed/cozycorner/800/600',
    alt: 'گوشه خلوت مطالعه کنار ویترین',
    title: 'فضای آرام مطالعه و کتاب‌خوانی',
    category: 'interior'
  },
  {
    id: 'g8',
    src: 'https://picsum.photos/seed/roastedbeans/800/600',
    alt: 'دانه‌های برشته‌شده با کیفیت',
    title: 'دانه‌های قهوه دست‌چین تک‌خاستگاه',
    category: 'coffee'
  }
];

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: 'e1',
    title: 'کارگاه خصوصی هنر طرای روی لاته (لاته آرت)',
    date: 'شنبه، ۳۰ خرداد',
    time: '۱۳:۰۰ تا ۱۵:۰۰',
    description: 'رازهای فوم‌دهی به شیر، تنظیم زوایای فنجان هنگام ریزش و ترسیم اصولی طرح‌های رز، برگ و قلب را از باریستای ارشد ما یاد بگیرید.',
    image: 'https://picsum.photos/seed/latteclass/600/400',
    price: 45,
    spotsLeft: 4,
    category: 'کارگاه آموزشی'
  },
  {
    id: 'e2',
    title: 'جلسه ارزیابی حسی و کاپینگ اسپرسو گیشا',
    date: 'چهارشنبه، ۴ تیر',
    time: '۱۸:۳۰ تا ۲۰:۰۰',
    description: 'به یک پرواز حسی و چشایی قهوه سنتی ملحق شوید. مقایسه نت‌های فرآوری عسلی اتیوپی، گیشا پاناما شسته‌شده و لایه‌های قهوه ترکیبی اختصاصی.',
    image: 'https://picsum.photos/seed/coffeecup/600/400',
    price: 25,
    spotsLeft: 8,
    category: 'رویداد اجتماعی و حسی'
  }
];

export const CAFE_INFO = {
  name: 'کافه‌نو',
  slogan: 'قهوه تازه، لحظه‌های تازه',
  phone: '۰۲۱-۸۸۸۸۴۴۴۴',
  email: 'hello@cafeno.com',
  address: 'تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۸۴',
  hours: [
    { days: 'شنبه تا چهارشنبه', open: '۷:۰۰ صبح', close: '۷:۰۰ عصر', rawOpen: 7, rawClose: 19 },
    { days: 'پنجشنبه', open: '۸:۰۰ صبح', close: '۸:۰۰ شب', rawOpen: 8, rawClose: 20 },
    { days: 'جمعه', open: '۸:۰۰ صبح', close: '۵:۰۰ عصر', rawOpen: 8, rawClose: 17 }
  ],
  socials: {
    instagram: 'https://instagram.com/cafeno',
    facebook: 'https://facebook.com/cafeno.coffee',
    pinterest: 'https://pinterest.com/cafeno.designs'
  }
};
