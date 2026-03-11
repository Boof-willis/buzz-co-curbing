import { useEffect } from 'react';

const FRANCHISE_PHONES = {
  logan:   { phone: '(435) 557-3648', href: 'tel:+14355573648' },
  central: { phone: '(385) 365-2121', href: 'tel:+13853652121' },
  south:   { phone: '(385) 533-6525', href: 'tel:+13855336525' },
};

const CITY_MAP = {
  'Logan': 'logan', 'Smithfield': 'logan', 'Hyde Park': 'logan',
  'North Logan': 'logan', 'Providence': 'logan', 'Nibley': 'logan',
  'Wellsville': 'logan', 'Hyrum': 'logan', 'Richmond': 'logan',
  'Mendon': 'logan', 'Millville': 'logan', 'River Heights': 'logan',
  'Paradise': 'logan', 'Lewiston': 'logan', 'Clarkston': 'logan',
  'Cornish': 'logan', 'Trenton': 'logan', 'Amalga': 'logan',
  'Newton': 'logan', 'Avon': 'logan',

  'Brigham City': 'central', 'Perry': 'central', 'Willard': 'central',
  'Mantua': 'central', 'Honeyville': 'central', 'Deweyville': 'central',
  'Tremonton': 'central', 'Garland': 'central', 'Bear River City': 'central',
  'Ogden': 'central', 'South Ogden': 'central', 'North Ogden': 'central',
  'Roy': 'central', 'Clearfield': 'central', 'Layton': 'central',
  'Kaysville': 'central', 'Farmington': 'central', 'Centerville': 'central',
  'Bountiful': 'central', 'North Salt Lake': 'central',
  'Woods Cross': 'central', 'West Bountiful': 'central',
  'Clinton': 'central', 'Sunset': 'central', 'Syracuse': 'central',
  'West Point': 'central', 'Pleasant View': 'central',
  'Riverdale': 'central', 'Washington Terrace': 'central',
  'Harrisville': 'central', 'Fruit Heights': 'central',
  'Salt Lake City': 'central', 'West Valley City': 'central',
  'West Jordan': 'central', 'Kearns': 'central',
  'Taylorsville': 'central', 'Murray': 'central', 'Magna': 'central',
  'Millcreek': 'central', 'Holladay': 'central',
  'South Salt Lake': 'central', 'Cottonwood Heights': 'central',
  'South Jordan': 'central', 'Sandy': 'central', 'Midvale': 'central',

  'Riverton': 'south', 'Draper': 'south', 'Herriman': 'south',
  'Bluffdale': 'south', 'Alpine': 'south', 'Highland': 'south',
  'Lehi': 'south', 'Saratoga Springs': 'south',
  'American Fork': 'south', 'Pleasant Grove': 'south',
  'Cedar Hills': 'south', 'Lindon': 'south', 'Orem': 'south',
  'Provo': 'south', 'Vineyard': 'south', 'Eagle Mountain': 'south',
  'Springville': 'south', 'Mapleton': 'south',
  'Spanish Fork': 'south', 'Salem': 'south', 'Payson': 'south',
  'Santaquin': 'south', 'Elk Ridge': 'south', 'Woodland Hills': 'south',
};

async function detectTerritory() {
  const cached = sessionStorage.getItem('buzzco_territory');
  if (cached && FRANCHISE_PHONES[cached]) {
    console.log('[GeoSwap] Using cached territory:', cached);
    return cached;
  }

  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data = await res.json();

    console.log('[GeoSwap] API response:', { city: data.city, region: data.region, lat: data.latitude });

    if (data.city && CITY_MAP[data.city]) {
      const territory = CITY_MAP[data.city];
      console.log('[GeoSwap] Exact city match:', data.city, '→', territory);
      sessionStorage.setItem('buzzco_territory', territory);
      return territory;
    }

    if (data.region === 'Utah' || data.region_code === 'UT') {
      const lat = data.latitude;
      let territory;
      if (lat > 41.4) territory = 'logan';
      else if (lat > 40.52) territory = 'central';
      else territory = 'south';
      console.log('[GeoSwap] Latitude fallback:', lat, '→', territory);
      sessionStorage.setItem('buzzco_territory', territory);
      return territory;
    }

    console.log('[GeoSwap] Not in Utah, keeping default');
    return null;
  } catch (err) {
    console.error('[GeoSwap] Detection failed:', err);
    return null;
  }
}

const ESTIMATE_URLS = {
  logan: '/logan/get-estimate/',
  central: '/central/get-estimate/',
  south: '/south/get-estimate/',
};

function applySwaps(territory) {
  const data = FRANCHISE_PHONES[territory];
  if (!data) return;

  console.log('[GeoSwap] Swapping phones to:', data.phone, '(territory:', territory + ')');

  document.querySelectorAll('[data-phone-display]').forEach(el => {
    el.textContent = data.phone;
  });
  document.querySelectorAll('[data-phone-href]').forEach(el => {
    el.setAttribute('href', data.href);
  });
  document.querySelectorAll('[data-estimate-href]').forEach(el => {
    el.setAttribute('href', ESTIMATE_URLS[territory]);
  });
}

export default function PhoneGeoSwap() {
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/logan') || path.startsWith('/central') || path.startsWith('/south')) {
      return;
    }
    detectTerritory().then(territory => {
      if (territory) applySwaps(territory);
    });
  }, []);

  return null;
}
