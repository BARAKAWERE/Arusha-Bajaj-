/* ---------- Mobile menu ---------- */
const burger = document.getElementById('burgerBtn');
const panel = document.getElementById('mobilePanel');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  panel.classList.toggle('open');
});
panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  panel.classList.remove('open');
  burger.classList.remove('open');
}));

/* ---------- Scroll reveal ---------- */
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ---------- Copy email to clipboard ---------- */
function copyEmail(event, email) {
  navigator.clipboard.writeText(email).then(function () {
    let msg = document.getElementById('copyMsg');
    if (msg) {
      msg.style.display = 'inline';
      setTimeout(() => { msg.style.display = 'none'; }, 2000);
    }
  }).catch(function (err) {
    console.error('Could not copy text: ', err);
  });
}

/* =========================================================
   LANGUAGE TOGGLE (default: English)
   ========================================================= */
const translations = {
  nav_services: { en: "Services", sw: "Huduma" },
  nav_tours: { en: "City Tours", sw: "Matembezi ya Jiji" },
  nav_pricing: { en: "Pricing", sw: "Bei" },
  nav_contact: { en: "Contact", sw: "Wasiliana" },
  nav_callnow: { en: "Call Now", sw: "Piga Simu" },

  hero_eyebrow: { en: "Arusha, Tanzania", sw: "Arusha, Tanzania" },
  hero_h1: { en: "Your bajaji, <em>your route</em>, your city.", sw: "Bajaji yako, <em>njia yako</em>, mji wako." },
  hero_lead: { en: "Fast, reliable bajaji rides across Arusha and thoughtfully planned city tours — from the Clock Tower to the Maasai Market, we get you there safely and affordably.", sw: "Safari za haraka na za kuaminika za bajaji Arusha, pamoja na matembezi ya jiji yaliyopangwa vizuri — kutoka Clock Tower hadi Maasai Market, tunakufikisha salama na kwa bei nafuu." },
  btn_call: { en: "📞 Call / WhatsApp", sw: "📞 Piga Simu / WhatsApp" },
  btn_routes: { en: "See Tour Routes →", sw: "Angalia Njia za Matembezi →" },
  route_title: { en: "TODAY'S ROUTE — ARUSHA CITY", sw: "NJIA YA LEO — MJI WA ARUSHA" },

  services_kicker: { en: "Our Services", sw: "Huduma Zetu" },
  services_h2: { en: "Not just a bajaji — your travel partner.", sw: "Si bajaji tu — mshirika wako wa safari." },
  services_p: { en: "Pick the service that fits — from a quick ride across town to a full-day tour.", sw: "Chagua huduma inayokufaa — kuanzia safari fupi mjini hadi matembezi ya siku nzima." },
  service1_h3: { en: "City Rides", sw: "Safari za Mjini" },
  service1_p: { en: "Quick trips around Arusha — market, office, or home, any time of day.", sw: "Safari fupi ndani ya Arusha — sokoni, ofisini, au nyumbani, wakati wowote wa siku." },
  service2_h3: { en: "City Tours", sw: "Matembezi ya Jiji" },
  service2_p: { en: "Planned tours of Arusha's landmark spots, for visitors and locals exploring the city.", sw: "Matembezi yaliyopangwa ya maeneo maarufu ya Arusha, kwa wageni na wakazi wanaotaka kujua mji." },
  service3_h3: { en: "Airport Transfers", sw: "Usafiri wa Uwanja wa Ndege" },
  service3_p: { en: "Pickup and drop-off at Kilimanjaro International (JRO) and Arusha Airport, on time.", sw: "Kuchukua na kupeleka Uwanja wa Ndege wa Kilimanjaro (JRO) na Arusha, kwa wakati." },
  service4_h3: { en: "Hourly Hire", sw: "Kukodi kwa Saa" },
  service4_p: { en: "A bajaji at your own pace — errands, events, or small group outings.", sw: "Bajaji kwa muda wako mwenyewe — shughuli, matukio, au safari za kikundi kidogo." },

  gallery_kicker: { en: "Gallery", sw: "Picha" },
  gallery_h2: { en: "See the bajaji, see the city.", sw: "Ona bajaji, ona mji." },
  gallery_p: { en: "A glimpse of our rides, colorful markets, and unforgettable city tours.", sw: "Mtazamo wa safari zetu, masoko yenye rangi, na matembezi ya jiji yasiyosahaulika." },

  highlights_kicker: { en: "Tour Highlights", sw: "Vivutio vya Matembezi" },
  highlights_h2: { en: "What makes our city tour unforgettable.", sw: "Kinachofanya matembezi yetu ya jiji yasisahaulike." },
  highlights_p: { en: "Four experiences that show you the real Arusha — its heritage, its markets, its history, and its flavors.", sw: "Uzoefu nne unaokuonyesha Arusha halisi — urithi wake, masoko yake, historia yake, na ladha zake." },
  hl1_h3: { en: "Cultural Heritage Centre", sw: "Kituo cha Urithi wa Utamaduni" },
  hl1_p: { en: "Enjoy the warmth of our experienced city tour guides while riding in tricycles (tuktuks) as you explore the unique beauty, cultural and artistic heritage of Arusha city at the Cultural Heritage Centre.", sw: "Furahia ukarimu wa waongoza watalii wetu wenye uzoefu ukiwa kwenye bajaji, ukigundua urembo wa kipekee, urithi wa kitamaduni na kisanaa wa mji wa Arusha katika Kituo cha Urithi wa Utamaduni." },
  hl2_h3: { en: "Soko Kuu (Central Market)", sw: "Soko Kuu" },
  hl2_p: { en: "Experience the heartbeat of Tanzanian daily life by visiting the Central Market, wandering through stalls packed with fresh tropical fruits, vegetables, and local spices.", sw: "Ona maisha halisi ya kila siku ya Mtanzania kwa kutembelea Soko Kuu, ukipita kwenye vibanda vilivyojaa matunda mabichi, mboga, na viungo vya asili." },
  hl3_h3: { en: "Boma Museum", sw: "Jumba la Makumbusho la Boma" },
  hl3_p: { en: "Visit the historic German fortified fort (Boma), today the National Natural History Museum, and learn about human evolution, wildlife, and local history and culture.", sw: "Tembelea ngome ya kihistoria ya Kijerumani (Boma), ambayo sasa ni Jumba la Kitaifa la Makumbusho ya Historia ya Asili, na ujifunze kuhusu mageuzi ya binadamu, wanyamapori, na historia na utamaduni wa eneo hilo." },
  hl4_h3: { en: "Taste of Arusha", sw: "Ladha ya Arusha" },
  hl4_p: { en: "Celebrate and enjoy the famous local food — nyama choma (roasted meat) and kachumbari (tomato and onion salad) with rice and grilled bananas at our favorite restaurants.", sw: "Furahia chakula maarufu cha asili — nyama choma na kachumbari pamoja na wali na ndizi za kuchoma kwenye migahawa yetu tunayoipenda." },

  tour_kicker: { en: "Popular Tour", sw: "Matembezi Maarufu" },
  tour_h2: { en: "Arusha City Tour Route", sw: "Njia ya Matembezi ya Mji wa Arusha" },
  tour_p: { en: "A sample half-day itinerary — we can adjust it to fit your time and interests.", sw: "Mfano wa ratiba ya nusu siku — tunaweza kuibadilisha ili ilingane na muda na mahitaji yako." },

  tk1_h4: { en: "Clock Tower", sw: "Clock Tower" },
  tk1_p: { en: "A famous starting point — local legend places it at the midpoint between Cape Town and Cairo.", sw: "Sehemu maarufu ya kuanzia — hadithi za wenyeji zinasema iko katikati ya Cape Town na Cairo." },
  tk1_tag: { en: "Photos & History", sw: "Picha na Historia" },
  tk2_h4: { en: "Maasai Market", sw: "Soko la Maasai" },
  tk2_p: { en: "Shop handmade crafts, shuka fabrics, and local gifts straight from the traders.", sw: "Nunua kazi za mikono, vitambaa vya shuka, na zawadi za asili moja kwa moja kutoka kwa wafanyabiashara." },
  tk2_tag: { en: "Shopping", sw: "Ununuzi" },
  tk3_h4: { en: "Cultural Heritage Centre", sw: "Kituo cha Urithi wa Utamaduni" },
  tk3_p: { en: "A museum and contemporary African art space — a great place to learn about Tanzania's history.", sw: "Jumba la makumbusho na nafasi ya sanaa za kisasa za Kiafrika — mahali pazuri pa kujifunza historia ya Tanzania." },
  tk3_tag: { en: "Culture", sw: "Utamaduni" },
  tk4_h4: { en: "Boma Museum", sw: "Jumba la Makumbusho la Boma" },
  tk4_p: { en: "Historic collections and exhibitions showcasing Arusha's past — a compact cultural stop.", sw: "Mkusanyiko wa kihistoria unaoonyesha maisha ya zamani ya Arusha — kituo kidogo cha kitamaduni." },
  tk4_tag: { en: "History", sw: "Historia" },
  tk5_h4: { en: "Meru Waterfall", sw: "Maporomoko ya Meru" },
  tk5_p: { en: "A natural setting right in the middle of the city — a good spot to relax and take photos before lunch.", sw: "Mazingira ya asili katikati ya mji — mahali pazuri pa kupumzika na kupiga picha kabla ya chakula cha mchana." },
  tk5_tag: { en: "Nature", sw: "Mazingira" },
  tk6_h4: { en: "Return to Town / Hotel", sw: "Kurudi Mjini / Hotelini" },
  tk6_p: { en: "We take you back safely to where you started, or continue on toward Ngorongoro or Momella on request.", sw: "Tunakurudisha salama pale ulipoanzia, au tunaweza kuendelea kuelekea Ngorongoro au Momella ukiomba." },
  tk6_tag: { en: "Wrap Up", sw: "Mwisho" },

  pricing_kicker: { en: "Pricing", sw: "Bei" },
  pricing_h2: { en: "Affordable prices, friendly to everyone.", sw: "Bei nafuu, rafiki kwa kila mmoja." },
  pricing_p: { en: "We don't post fixed prices here because every trip is different — distance, duration, and your needs. Tell us your trip below and get a fair price on WhatsApp in seconds.", sw: "Hatuweki bei fasta hapa kwa sababu kila safari ni tofauti — umbali, muda, na mahitaji yako. Tuambie safari yako hapa chini na upate bei ya haki kwa WhatsApp ndani ya sekunde." },
  trip_city: { en: "City Ride", sw: "Safari ya Mjini" },
  trip_half: { en: "Half-Day Tour", sw: "Matembezi ya Nusu Siku" },
  trip_full: { en: "Full-Day Tour", sw: "Matembezi ya Siku Nzima" },
  trip_airport: { en: "Airport Transfer", sw: "Usafiri wa Uwanja wa Ndege" },
  trip_hourly: { en: "Hourly Hire", sw: "Kukodi kwa Saa" },
  ph_from: { en: "Where are you now?", sw: "Uko wapi sasa?" },
  ph_to: { en: "Where are you going / trip notes", sw: "Unaenda wapi / maelezo ya safari" },
  loc_btn_mini: { en: "📍 Use My Location", sw: "📍 Tumia Eneo Langu" },
  price_submit: { en: "💬 Get My Price on WhatsApp", sw: "💬 Pata Bei Yangu kwa WhatsApp" },

  reviews_kicker: { en: "Customer Reviews", sw: "Maoni ya Wateja" },
  reviews_h2: { en: "What riders are saying.", sw: "Wanachosema wateja wetu." },
  testi1_quote: { en: '"The driver was polite and knew every corner of the city. The tour was short but memorable."', sw: '"Dereva alikuwa mstaarabu na alijua kila kona ya mji. Safari ilikuwa fupi lakini ya kukumbukwa."' },
  testi1_role: { en: "Arusha Resident", sw: "Mkazi wa Arusha" },
  testi2_quote: { en: '"Booked the half-day tour before our Serengeti trip — great value and very reliable pickup time."', sw: '"Nilibuk safari ya nusu siku kabla ya safari yetu ya Serengeti — thamani nzuri na muda wa kuchukua ulikuwa wa kuaminika sana."' },
  testi2_role: { en: "Tourist, UK", sw: "Mtalii, Uingereza" },
  testi3_quote: { en: '"I use it for my daily commute to work. Fair prices and never late."', sw: '"Ninaitumia kwa safari zangu za kila siku kazini. Bei nzuri na hawachelewi kamwe."' },
  testi3_role: { en: "Regular Customer", sw: "Mteja wa Kudumu" },
  disqus_h3: { en: "Leave a Review & Comment", sw: "Acha Maoni Yako" },

  contact_h2: { en: "Plan your ride today.", sw: "Panga safari yako leo." },
  contact_p: { en: "Call us, message on WhatsApp, or fill the form — we'll reply quickly to confirm your bajaji and schedule.", sw: "Tupigie simu, tumia WhatsApp, au jaza fomu — tutajibu haraka kuthibitisha bajaji yako na ratiba." },
  lbl_phone: { en: "PHONE", sw: "SIMU" },
  lbl_whatsapp: { en: "WHATSAPP", sw: "WHATSAPP" },
  lbl_email: { en: "EMAIL", sw: "BARUA PEPE" },
  lbl_location: { en: "LOCATION", sw: "ENEO" },
  val_location: { en: "Arusha, Tanzania", sw: "Arusha, Tanzania" },
  lbl_hours: { en: "OPERATING HOURS", sw: "MASAA YA KAZI" },
  val_hours: { en: "Every day, 06:00 - 22:00", sw: "Kila siku, 06:00 - 22:00" },

  loc_title: { en: "📍 Where are you now?", sw: "📍 Uko wapi sasa?" },
  loc_p: { en: "Tap below to send your current location straight to WhatsApp, so the driver can find you faster.", sw: "Bofya hapa chini kutuma eneo lako la sasa moja kwa moja kwa WhatsApp, ili dereva akuone haraka." },
  loc_btn: { en: "📍 Share My Location", sw: "📍 Tuma Eneo Langu" },

  ph_name: { en: "Your name", sw: "Jina lako" },
  ph_phone: { en: "Phone number", sw: "Namba ya simu" },
  ph_trip: { en: "Tell us about the trip you need (e.g. half-day tour, Saturday morning)", sw: "Tuambie kuhusu safari unayohitaji (mfano: matembezi ya nusu siku, Jumamosi asubuhi)" },
  form_btn: { en: "Send Booking Request", sw: "Tuma Ombi la Booking" },
  form_note: { en: "By clicking, you will be redirected to WhatsApp to send your booking request directly. If you shared your location above, it will be included automatically.", sw: "Ukibofya, utaelekezwa WhatsApp kutuma ombi lako moja kwa moja. Kama umeshatuma eneo lako hapo juu, litaongezwa moja kwa moja." },

  footer1: { en: "© 2026 Meru Bajaji, Arusha. All rights reserved.", sw: "© 2026 Meru Bajaji, Arusha. Haki zote zimehifadhiwa." },
  footer2: { en: "Website design — a starting template for your business.", sw: "Muundo wa tovuti — kianzio cha biashara yako." },
};

let currentLang = 'en';

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const entry = translations[key];
    if (entry && entry[lang]) {
      el.innerHTML = entry[lang];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const entry = translations[key];
    if (entry && entry[lang]) {
      el.setAttribute('placeholder', entry[lang]);
    }
  });

  const nextLabel = lang === 'en' ? 'SW' : 'EN';
  const t1 = document.getElementById('langToggle');
  const t2 = document.getElementById('langToggleMobile');
  if (t1) t1.textContent = nextLabel;
  if (t2) t2.textContent = nextLabel;
}

function toggleLanguage() {
  applyLanguage(currentLang === 'en' ? 'sw' : 'en');
}

document.getElementById('langToggle')?.addEventListener('click', toggleLanguage);
document.getElementById('langToggleMobile')?.addEventListener('click', toggleLanguage);

/* Site defaults to English on every load, as requested. */
applyLanguage('en');

/* =========================================================
   SHARE MY LOCATION (GPS -> Google Maps link -> WhatsApp)
   ========================================================= */
const BUSINESS_WHATSAPP = "255785591980";
let sharedLocationLink = ""; // stored so the booking form can attach it too

function shareLocation() {
  const statusEl = document.getElementById('locationStatus');
  if (!navigator.geolocation) {
    statusEl.textContent = currentLang === 'sw'
      ? "Simu/kivinjari chako hakiungi mkono huduma ya location. Tafadhali tuandikie eneo lako kwenye ujumbe."
      : "Your device or browser doesn't support location sharing. Please just type your location in the message instead.";
    statusEl.style.color = "#e2a13d";
    return;
  }

  statusEl.textContent = currentLang === 'sw' ? "Tunatafuta eneo lako..." : "Finding your location...";
  statusEl.style.color = "#cdbfa6";

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude.toFixed(6);
      const lng = position.coords.longitude.toFixed(6);
      const accuracy = Math.round(position.coords.accuracy || 0); // meters
      sharedLocationLink = `https://www.google.com/maps?q=${lat},${lng}`;

      let accuracyNote = "";
      if (accuracy > 300) {
        // Low precision - typical of WiFi/IP-based location on a laptop with no GPS chip
        accuracyNote = currentLang === 'sw'
          ? ` ⚠️ Usahihi ni mkubwa (± ${accuracy}m). Kompyuta hazina GPS, hivyo eneo linaweza kuwa si sahihi kabisa — kwa usahihi zaidi, fungua tovuti hii kwenye SIMU YAKO ya mkononi.`
          : ` ⚠️ Accuracy is low (± ${accuracy}m). Laptops don't have GPS, so this may not be exact — for a precise location, open this site on your PHONE instead.`;
      } else {
        accuracyNote = currentLang === 'sw' ? ` (usahihi: ± ${accuracy}m)` : ` (accuracy: ± ${accuracy}m)`;
      }

      const viewMapText = currentLang === 'sw' ? 'Angalia kwenye Ramani' : 'View on Map';
      statusEl.innerHTML = `✅ <a href="${sharedLocationLink}" target="_blank" style="color:#e2a13d; text-decoration:underline;">${viewMapText}</a>${accuracyNote}`;

      const msgIntro = currentLang === 'sw' ? 'Hello! Ninahitaji bajaji.' : 'Hello! I need a bajaji.';
      const msgLabel = currentLang === 'sw' ? 'Eneo langu la sasa (live location):' : 'My current location (live location):';
      const message = `${encodeURIComponent(msgIntro)}%0A%0A*${encodeURIComponent(msgLabel)}*%0A${encodeURIComponent(sharedLocationLink)}`;
      const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    },
    function (error) {
      let reason;
      if (error.code === error.PERMISSION_DENIED) {
        reason = currentLang === 'sw'
          ? "Umekataa ruhusa ya location. Tafadhali iwezeshe kwenye mipangilio ya kivinjari chako kisha jaribu tena."
          : "You denied location permission. Please enable it in your browser settings and try again.";
      } else {
        reason = currentLang === 'sw' ? "Imeshindikana kupata eneo lako." : "Couldn't get your location.";
      }
      statusEl.textContent = reason;
      statusEl.style.color = "#c1392b";
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

/* ---------- Booking form -> WhatsApp ---------- */
function sendToWhatsApp(event) {
  event.preventDefault();

  let name = document.getElementById('guestName').value;
  let phone = document.getElementById('guestPhone').value;
  let trip = document.getElementById('guestTrip').value;

  const labels = currentLang === 'sw'
    ? { intro: 'Hello! Nina ombi jipya la booking:', name: 'Jina', phone: 'Namba', trip: 'Maelezo ya safari', loc: 'Eneo (live location)' }
    : { intro: 'Hello! I have a new booking request:', name: 'Name', phone: 'Phone', trip: 'Trip details', loc: 'Location (live location)' };

  let message = `${encodeURIComponent(labels.intro)}%0A%0A` +
                `*${encodeURIComponent(labels.name)}:* ${encodeURIComponent(name)}%0A` +
                `*${encodeURIComponent(labels.phone)}:* ${encodeURIComponent(phone)}%0A` +
                `*${encodeURIComponent(labels.trip)}:* ${encodeURIComponent(trip)}`;

  if (sharedLocationLink) {
    message += `%0A*${encodeURIComponent(labels.loc)}:* ${encodeURIComponent(sharedLocationLink)}`;
  }

  let whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

/* =========================================================
   INSTANT PRICE REQUEST (trip type chips + location + WhatsApp)
   ========================================================= */
let selectedTrip = 'city';

document.querySelectorAll('.trip-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.trip-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectedTrip = chip.getAttribute('data-trip');
  });
});

function fillLocationField(fieldId) {
  const field = document.getElementById(fieldId);
  const statusEl = document.getElementById('priceFormStatus');
  if (!navigator.geolocation) {
    statusEl.textContent = currentLang === 'sw'
      ? "Kifaa chako hakiungi mkono huduma ya location."
      : "Your device doesn't support location sharing.";
    statusEl.style.color = "#e2a13d";
    return;
  }

  statusEl.textContent = currentLang === 'sw' ? "Tunatafuta eneo lako..." : "Finding your location...";
  statusEl.style.color = "#cdbfa6";

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude.toFixed(6);
      const lng = position.coords.longitude.toFixed(6);
      const accuracy = Math.round(position.coords.accuracy || 0);
      const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
      field.value = mapsLink;

      if (accuracy > 300) {
        statusEl.textContent = currentLang === 'sw'
          ? `⚠️ Usahihi ni mkubwa (± ${accuracy}m). Kwa usahihi zaidi, tumia SIMU yako badala ya kompyuta.`
          : `⚠️ Accuracy is low (± ${accuracy}m). For a precise location, use your PHONE instead of a laptop.`;
        statusEl.style.color = "#e2a13d";
      } else {
        statusEl.textContent = currentLang === 'sw' ? `✅ Eneo limejazwa (usahihi: ± ${accuracy}m)` : `✅ Location filled (accuracy: ± ${accuracy}m)`;
        statusEl.style.color = "#5c7a52";
      }
    },
    function (error) {
      statusEl.textContent = currentLang === 'sw' ? "Imeshindikana kupata eneo lako." : "Couldn't get your location.";
      statusEl.style.color = "#c1392b";
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

function sendPriceRequest(event) {
  event.preventDefault();

  const from = document.getElementById('priceFrom').value;
  const to = document.getElementById('priceTo').value;
  const tripKey = 'trip_' + selectedTrip;
  const tripLabel = (translations[tripKey] && translations[tripKey][currentLang]) || selectedTrip;

  const labels = currentLang === 'sw'
    ? { intro: 'Hello! Ninahitaji bei ya safari:', trip: 'Aina ya safari', from: 'Kutoka', to: 'Kwenda / Maelezo' }
    : { intro: 'Hello! I need a price for a trip:', trip: 'Trip type', from: 'From', to: 'To / Notes' };

  let message = `${encodeURIComponent(labels.intro)}%0A%0A` +
                `*${encodeURIComponent(labels.trip)}:* ${encodeURIComponent(tripLabel)}%0A` +
                `*${encodeURIComponent(labels.from)}:* ${encodeURIComponent(from)}`;

  if (to) {
    message += `%0A*${encodeURIComponent(labels.to)}:* ${encodeURIComponent(to)}`;
  }

  const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}