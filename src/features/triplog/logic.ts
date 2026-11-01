export type Lang='bn'|'en';
export const bn=(n:number)=>n.toLocaleString('bn-BD');
export const num=(n:number,lang:Lang='bn')=>n.toLocaleString(lang==='bn'?'bn-BD':'en-US');
export function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Dhaka',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
export function nowTime(){return new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Dhaka',hour:'2-digit',minute:'2-digit'});}
export function fuelMath(quantity:number,price:number,allowance:number){return {total:quantity*price,excess:quantity-allowance};}
export function bnDigits(s:string){return s.replace(/[0-9]/g,d=>'০১২৩৪৫৬৭৮৯'[Number(d)]??d);}
/** Bengali 12-hour colloquial time: ভোর ৪-৬:৫৯, সকাল ৭-১০:৫৯, দুপুর ১১-২:৫৯, বিকাল ৩-৫:৫৯, সন্ধ্যা ৬টা, রাত ৭টা-৩:৫৯. */
export function bnTime(time:string,lang:Lang='bn'){
 if(!time)return '';
 const [h=0,m=0]=time.split(':').map(Number);
 if(lang==='en')return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
 const period=h>=4&&h<7?'ভোর':h>=7&&h<11?'সকাল':h>=11&&h<15?'দুপুর':h>=15&&h<18?'বিকাল':h===18?'সন্ধ্যা':'রাত';
 const h12=h%12===0?12:h%12;
 return `${period} ${bnDigits(String(h12))}:${bnDigits(String(m).padStart(2,'0'))}`;
}
export function durationLabel(upTime:string,downTime:string,lang:Lang='bn'){
 const [uh=0,um=0]=upTime.split(':').map(Number),[dh=0,dm=0]=downTime.split(':').map(Number);
 let m=dh*60+dm-(uh*60+um);if(m<0)m+=1440;
 if(lang==='en')return `${Math.floor(m/60)}h ${m%60}m`;
 return `${bnDigits(String(Math.floor(m/60)))} ঘ ${bnDigits(String(m%60))} মি`;
}
/** Mileage-based expected fuel: total km ÷ mileage (km/litre). */
export function expectedFuel(km:number,mileage:number){return mileage>0?km/mileage:0;}
export const round1=(x:number)=>Math.round(x*10)/10;
/** Variance = fuel given − expected fuel. Over → red '+', equal → blue '০', under → green '−'. */
export function variance(given:number,expected:number){
 const diff=round1(given-expected);
 return {diff,cls:diff>0?'var-over':diff<0?'var-under':'var-even',sign:diff>0?'+':diff<0?'−':''};
}
export function ordinalLabel(n:number,lang:Lang='bn'){if(n===1)return '';if(lang==='en')return n===2?'2nd trip':n===3?'3rd trip':`${n}th trip`;return n===2?'২য় ট্রিপ':n===3?'তৃতীয় ট্রিপ':`${bn(n)}তম ট্রিপ`;}
export function rankPeople(logs:{supervisor_id:string;driver_id:string}[],key:'supervisor_id'|'driver_id'){const counts=new Map<string,number>();logs.forEach(l=>counts.set(l[key],(counts.get(l[key])??0)+1));return [...counts].map(([id,count])=>({id,count})).sort((a,b)=>b.count-a.count);}
export function pageHead(title:string){const description=`Trip & Fuel Logbook — যাত্রীবাহী বাসের ${title}। Powered by Data & Code.`;return {meta:[{title:`${title} | Trip & Fuel Logbook`},{name:'description',content:description},{property:'og:title',content:`${title} | Trip & Fuel Logbook`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};}

export const STR={
 bn:{
  dashboard:'ড্যাশবোর্ড',trips:'ট্রিপ লগ',fuel:'ফুয়েল লগ',database:'ডাটাবেইজ',users:'ইউজার ম্যানেজমেন্ট',
  workspace:'ওয়ার্কস্পেস',newTrip:'নতুন ট্রিপ',fuelEntry:'ফুয়েল এন্ট্রি',newData:'নতুন তথ্য',newUser:'নতুন ইউজার',
  from:'থেকে',todayBtn:'আজ',print:'প্রিন্ট',pdf:'পিডিএফ',share:'WhatsApp-এ ফাইল শেয়ার',
  serial:'ক্রমিক নং',date:'তারিখ',time:'সময়',vehicle:'গাড়ি নাম্বার',supervisor:'সুপারভাইজার',driver:'ড্রাইভার',
  fuelQty:'তেল (লি.)',totalTaka:'মোট টাকা',excessFuel:'অতিরিক্ত তেল',searchPh:'গাড়ি বা নাম দিয়ে খুঁজুন…',
  login:'লগইন',logout:'লগআউট',admin:'অ্যাডমিন',staff:'স্টাফ',online:'অনলাইন',needLogin:'লগইন প্রয়োজন',
  masterAdmin:'মাস্টার অ্যাডমিন',staffAccount:'স্টাফ অ্যাকাউন্ট',yourWorkspace:'আপনার ওয়ার্কস্পেস',
  dashSub:'আপনার পরিবহনের প্রতিদিনের চিত্র, এক নজরে।',tripsSub:'প্রতিটি যাত্রার নির্ভরযোগ্য হিসাব।',
  fuelSub:'তেলের ব্যবহার ও খরচের সঠিক হিসাব।',dbSub:'আপনার বাস, সুপারভাইজার ও ড্রাইভারের তালিকা।',
  usersSub:'আপনার টিমের অ্যাকাউন্ট ও প্রবেশাধিকার।',
  totalTrips:'মোট ট্রিপ',activeBuses:'সক্রিয় বাস',totalFuel:'মোট তেল',totalFuelCost:'তেলের মোট খরচ',
  tripUnit:'ট্রিপ',busUnit:'টি বাস',litre:'লিটার',selectedTrips:'নির্বাচিত সময়ের মোট যাত্রা',
  busesInDb:'টি বাস ডাটাবেইজে যুক্ত',fuelEntries:'টি ফুয়েল এন্ট্রি',grandTotal:'নির্বাচিত সময়ের সর্বমোট',
  tripStats:'ট্রিপের পরিসংখ্যান',perDay:'দিন অনুযায়ী মোট ট্রিপ',tripCount:'ট্রিপ সংখ্যা',tripsCount:'টি ট্রিপ',
  ranking:'ট্রিপ র‍্যাংকিং',highToLow:'সর্বোচ্চ থেকে সর্বনিম্ন',noTripsYet:'এখনও কোনো ট্রিপ নেই',
  recentTrips:'সাম্প্রতিক ট্রিপ',fuelEntriesT:'ফুয়েল এন্ট্রি',tripList:'ট্রিপের তালিকা',allTrips:'সব ট্রিপ দেখুন',
  noFuelYet:'এখনও কোনো ফুয়েল এন্ট্রি নেই',noTripYet:'এখনও কোনো ট্রিপ নেই',
  startAfterLogin:'লগইন করে আপনার পরিবহনের হিসাব শুরু করুন।',startNew:'নতুন এন্ট্রি দিয়ে আপনার দিনের হিসাব শুরু করুন।',
  firstEntry:'প্রথম এন্ট্রি',entriesTotal:'টি এন্ট্রি',total:'মোট',savedCloud:'ক্লাউডে সংরক্ষিত',
  fuelCalc:'তেলের নির্ধারিত হিসাব',allowanceL:'ধার্যকৃত তেল (লিটার)',priceL:'তেলের মূল্য (৳ / লিটার)',save:'সংরক্ষণ',
  settingsSaved:'পরবর্তী এন্ট্রির জন্য হিসাব সংরক্ষিত।',settingsFail:'হিসাব সংরক্ষণ হয়নি।',
  vehicleNo:'গাড়ি নাম্বার',supervisors:'সুপারভাইজার',drivers:'ড্রাইভার',noData:'কোনো তথ্য যুক্ত হয়নি',
  staffRanking:'ট্রিপ অনুযায়ী কর্মীদের র‍্যাংকিং',tripSuffix:'ট্রিপ',
  teamMembers:'টিমের সদস্য',name:'নাম',userId:'ইউজার আইডি',status:'স্ট্যাটাস',access:'প্রবেশাধিকার',
  active:'সক্রিয়',inactive:'বন্ধ',deactivate:'বন্ধ করুন',activate:'চালু করুন',
  noStaff:'কোনো স্টাফ অ্যাকাউন্ট নেই',noStaffSub:'মাস্টার অ্যাডমিন নতুন আইডি ও পিন তৈরি করতে পারবেন।',
  loginTitle:'ট্রিপ লগ-এ লগইন',signupTitle:'অ্যাডমিন নিবন্ধন',emailOrId:'ইমেইল / স্টাফ আইডি',email:'ইমেইল',
  passOrPin:'পাসওয়ার্ড / পিন',password:'পাসওয়ার্ড',wait:'অপেক্ষা করুন…',doLogin:'লগইন করুন',doSignup:'নিবন্ধন করুন',
  haveAccount:'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন',adminSignup:'মাস্টার অ্যাডমিন নিবন্ধন',
  confirmEmailFirst:'প্রথমে ইমেইলের লিংকে চাপ দিয়ে অ্যাকাউন্ট নিশ্চিত করুন, তারপর লগইন করুন।',resendConfirmation:'নিশ্চিতকরণ ইমেইল আবার পাঠান',confirmationSent:'নিশ্চিতকরণ ইমেইল পাঠানো হয়েছে। ইনবক্স ও স্প্যাম দেখুন।',confirmationFailed:'ইমেইল পাঠানো যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।',
  signupNote:'নির্ধারিত মালিকের ইমেইল নিশ্চিত হলেই মাস্টার অ্যাডমিন অনুমতি চালু হবে।',
  loginOk:'লগইন সফল হয়েছে।',loginFail:'ইমেইল/আইডি অথবা পাসওয়ার্ড/পিন সঠিক নয়।',badEmail:'সঠিক ইমেইল দিন।',
  signupOk:'ইমেইলের লিংক দিয়ে নিবন্ধন নিশ্চিত করুন। নির্ধারিত ইমেইলেই অ্যাডমিন অনুমতি চালু হবে।',
  newFuelEntry:'নতুন ফুয়েল এন্ট্রি',fuelAmount:'তেলের পরিমাণ (লিটার)',excessL:'অতিরিক্ত তেল',
  saveEntry:'এন্ট্রি সংরক্ষণ করুন',saving:'সংরক্ষণ হচ্ছে…',entrySaved:'এন্ট্রি সংরক্ষণ হয়েছে।',
  saveFail:'এন্ট্রি সংরক্ষণ হয়নি। তথ্য ও অনুমতি যাচাই করুন।',setFuelFirst:'আগে তেলের মূল্য ও ধার্যকৃত পরিমাণ সংরক্ষণ করুন।',
  dupTitle:'একই দিনে একই গাড়ির এন্ট্রি আছে',cancel:'বাতিল',confirmSave:'কনফার্ম করে সংরক্ষণ',
  dupBody:(v:string,d:string,o:string)=>`${v} গাড়ির জন্য ${d} তারিখে এন্ট্রি রয়েছে। ${o} হিসেবে সংরক্ষণ করবেন?`,
  newDbEntry:'ডাটাবেইজে নতুন তথ্য',adminOnly:'শুধু মাস্টার অ্যাডমিন তথ্য যুক্ত করতে পারবেন।',
  dataType:'তথ্যের ধরন',nameOrVehicle:'নাম / গাড়ি নাম্বার',doSave:'সংরক্ষণ করুন',
  dupName:'একই নাম আগে থাকতে পারে। সংরক্ষণ হয়নি।',dataAdded:'তথ্য যুক্ত হয়েছে।',
  newStaff:'নতুন স্টাফ অ্যাকাউন্ট',adminOnlyStaff:'শুধু মাস্টার অ্যাডমিন স্টাফ তৈরি করতে পারবেন।',
  pinL:'পিন (৬–১২ সংখ্যা)',createAccount:'অ্যাকাউন্ট তৈরি করুন',
  staffOk:'স্টাফ অ্যাকাউন্ট তৈরি হয়েছে। আইডি ও পিন স্টাফকে দিন।',staffFail:'অ্যাকাউন্ট তৈরি হয়নি।',changeFail:'পরিবর্তন হয়নি।',
  pickPrefix:'নির্বাচন করুন',searchName:'নাম লিখে খুঁজুন…',addFirst:'ডাটাবেইজে আগে তথ্য যুক্ত করুন।',
  pdfSaved:'পিডিএফ সেভ হয়েছে।',pdfSavedShare:'পিডিএফ সেভ হয়েছে। WhatsApp খুলে ফাইলটি সংযুক্ত করুন।',
  pdfFail:'পিডিএফ তৈরি হয়নি। প্রিন্ট থেকে PDF সেভ করতে পারেন।',
  mileage:'মাইলেজ (কিমি/লি)',expectedFuel:'নির্ধারিত ফুয়েল',givenFuel:'প্রদানকৃত ফুয়েল',variance:'ফুয়েল +/-',duration:'সময় ব্যবধান',totalKm:'মোট কিমি',roundTrip:'রাউন্ড ট্রিপ রুট',updateBtn:'আপডেট করুন',totalDistance:'মোট দূরত্ব',
  reportTitle:'ট্রিপ লগ',reportSub:'দৈনিক হিসাব',poweredBy:'Powered by Data & Code',
  loading:'ট্রিপ লগ লোড হচ্ছে…',passengerBus:'যাত্রীবাহী বাস',transportMgmt:'পরিবহন ব্যবস্থাপনা',cloudOk:'Lovable Cloud সংযুক্ত',
 },
 en:{
  dashboard:'Dashboard',trips:'Trip Log',fuel:'Fuel Log',database:'Database',users:'User Management',
  workspace:'Workspace',newTrip:'New Trip',fuelEntry:'Fuel Entry',newData:'New Data',newUser:'New User',
  from:'to',todayBtn:'Today',print:'Print',pdf:'PDF',share:'Share file on WhatsApp',
  serial:'SL',date:'Date',time:'Time',vehicle:'Vehicle No',supervisor:'Supervisor',driver:'Driver',
  fuelQty:'Fuel (L)',totalTaka:'Total (৳)',excessFuel:'Excess Fuel',searchPh:'Search by vehicle or name…',
  login:'Sign in',logout:'Sign out',admin:'Admin',staff:'Staff',online:'Online',needLogin:'Sign in required',
  masterAdmin:'Master Admin',staffAccount:'Staff Account',yourWorkspace:'Your Workspace',
  dashSub:'Your transport at a glance, every day.',tripsSub:'A reliable record of every trip.',
  fuelSub:'Accurate fuel usage and cost accounts.',dbSub:'Your buses, supervisors and drivers.',
  usersSub:'Your team accounts and access.',
  totalTrips:'Total Trips',activeBuses:'Active Buses',totalFuel:'Total Fuel',totalFuelCost:'Total Fuel Cost',
  tripUnit:'trips',busUnit:'buses',litre:'L',selectedTrips:'Trips in selected range',
  busesInDb:'buses in database',fuelEntries:'fuel entries',grandTotal:'Grand total for range',
  tripStats:'Trip Statistics',perDay:'Trips per day',tripCount:'Trips',tripsCount:'trips',
  ranking:'Trip Ranking',highToLow:'Highest to lowest',noTripsYet:'No trips yet',
  recentTrips:'Recent Trips',fuelEntriesT:'Fuel Entries',tripList:'Trip List',allTrips:'View all trips',
  noFuelYet:'No fuel entries yet',noTripYet:'No trips yet',
  startAfterLogin:'Sign in to start your transport records.',startNew:'Add a new entry to start the day.',
  firstEntry:'First entry',entriesTotal:'entries',total:'Total',savedCloud:'Saved in cloud',
  fuelCalc:'Fuel Settings',allowanceL:'Fuel allowance (litres)',priceL:'Fuel price (৳ / litre)',save:'Save',
  settingsSaved:'Saved for the next entries.',settingsFail:'Could not save settings.',
  vehicleNo:'Vehicle No',supervisors:'Supervisors',drivers:'Drivers',noData:'No data added yet',
  staffRanking:'Staff ranking by trips',tripSuffix:'trips',
  teamMembers:'Team Members',name:'Name',userId:'User ID',status:'Status',access:'Access',
  active:'Active',inactive:'Disabled',deactivate:'Disable',activate:'Enable',
  noStaff:'No staff accounts',noStaffSub:'The master admin can create IDs and PINs.',
  loginTitle:'Sign in to Trip Log',signupTitle:'Admin Registration',emailOrId:'Email / Staff ID',email:'Email',
  passOrPin:'Password / PIN',password:'Password',wait:'Please wait…',doLogin:'Sign in',doSignup:'Register',
  haveAccount:'Already have an account? Sign in',adminSignup:'Master admin registration',
  confirmEmailFirst:'Confirm your account using the email link before signing in.',resendConfirmation:'Resend confirmation email',confirmationSent:'Confirmation email sent. Check your inbox and spam.',confirmationFailed:'Could not send the email. Please try again shortly.',
  signupNote:'Admin access activates only for the designated owner email once confirmed.',
  loginOk:'Signed in successfully.',loginFail:'Email/ID or password/PIN is incorrect.',badEmail:'Enter a valid email.',
  signupOk:'Confirm via the email link. Admin access activates only for the designated email.',
  newFuelEntry:'New Fuel Entry',fuelAmount:'Fuel quantity (litres)',excessL:'Excess fuel',
  saveEntry:'Save Entry',saving:'Saving…',entrySaved:'Entry saved.',
  saveFail:'Could not save. Check data and permissions.',setFuelFirst:'Save fuel price and allowance first.',
  dupTitle:'Same vehicle already has an entry today',cancel:'Cancel',confirmSave:'Confirm & Save',
  dupBody:(v:string,d:string,o:string)=>`Vehicle ${v} already has an entry on ${d}. Save as ${o}?`,
  newDbEntry:'New Database Entry',adminOnly:'Only the master admin can add data.',
  dataType:'Data type',nameOrVehicle:'Name / Vehicle No',doSave:'Save',
  dupName:'Name may already exist. Not saved.',dataAdded:'Data added.',
  newStaff:'New Staff Account',adminOnlyStaff:'Only the master admin can create staff.',
  pinL:'PIN (6–12 digits)',createAccount:'Create Account',
  staffOk:'Staff account created. Share the ID and PIN.',staffFail:'Could not create account.',changeFail:'Change failed.',
  pickPrefix:'Select',searchName:'Type a name to search…',addFirst:'Add data in Database first.',
  pdfSaved:'PDF saved.',pdfSavedShare:'PDF saved. Open WhatsApp and attach the file.',
  pdfFail:'Could not create PDF. You can save via Print.',
  mileage:'Mileage (km/L)',expectedFuel:'Expected fuel',givenFuel:'Fuel given',variance:'Fuel +/-',duration:'Duration',totalKm:'Total km',roundTrip:'Round trip route',updateBtn:'Update',totalDistance:'Total distance',
  reportTitle:'Trip Log',reportSub:'Daily Report',poweredBy:'Powered by Data & Code',
  loading:'Loading Trip Log…',passengerBus:'Passenger Bus',transportMgmt:'Transport Management',cloudOk:'Lovable Cloud connected',
 },
} as const;
export type StrKey=keyof typeof STR.bn;

export const WEEKDAY={bn:['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'],en:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']};
export function weekday(date:string,lang:Lang='bn'){if(!date)return '';return WEEKDAY[lang][new Date(date+'T00:00:00Z').getUTCDay()];}
/** Staff log in with ID+PIN; the auth password is derived so short PINs pass password policy. */
export function staffPassword(code:string,pin:string){return `TL#${code.trim().toLowerCase()}@${pin}!Trip`;}
export function joinRoute(a:string,b:string){const pa=a.split(/\s*-\s*/),pb=b.split(/\s*-\s*/);if(pa[pa.length-1]===pb[0])return [...pa,...pb.slice(1)].join(' - ');return [...pa,...pb].join(' - ');}
export type TripRow={id:string;entry_date:string;entry_time:string;vehicle_id:string;direction:string|null;night_hold:boolean;route_id:string|null};
export type Pair<T>={up:T|null;down:T|null};
/** Match each Up trip with the vehicle's next Down trip: same date, or next date when either is night-hold. */
export function pairTrips<T extends TripRow>(rows:T[]):Pair<T>[]{
 const sorted=[...rows].sort((a,b)=>(a.entry_date+a.entry_time).localeCompare(b.entry_date+b.entry_time));
 const used=new Set<string>();const out:Pair<T>[]=[];
 const nextDay=(d:string)=>{const x=new Date(d+'T00:00:00Z');x.setUTCDate(x.getUTCDate()+1);return x.toISOString().slice(0,10);};
 for(const up of sorted){if(up.direction!=='up'||used.has(up.id))continue;
  const down=sorted.find(d=>!used.has(d.id)&&d.direction==='down'&&d.vehicle_id===up.vehicle_id&&((d.entry_date===up.entry_date&&d.entry_time>=up.entry_time)||((up.night_hold||d.night_hold)&&d.entry_date===nextDay(up.entry_date))));
  used.add(up.id);if(down)used.add(down.id);out.push({up,down:down??null});}
 for(const r of sorted)if(!used.has(r.id))out.push(r.direction==='down'?{up:null,down:r}:{up:r,down:null});
 return out;
}
export const STR2={
 bn:{database:'ডাটা ম্যানুফ্যাকচার',report:'ট্রিপ সমন্বয় রিপোর্ট',dbSub:'গাড়ি, সুপারভাইজার, ড্রাইভার, রুট ও কাউন্টারের তালিকা।',reportSub:'আপ ও ডাউন ট্রিপ মিলিয়ে পূর্ণ রুট, দূরত্ব ও তেল।',routes:'রুট',counters:'কাউন্টার',route:'রুট',distance:'দূরত্ব (কিমি)',direction:'দিক',up:'আপ ট্রিপ',down:'ডাউন ট্রিপ',nightHold:'নাইট হোল্ড',day:'বার',fullRoute:'পূর্ণ রুট',pending:'ফিরতি বাকি',matched:'সমন্বিত',role:'রোল',tripOperator:'ট্রিপ অপারেটর',fuelManager:'ফুয়েল ম্যানেজার',counter:'কাউন্টার',none:'— নেই —',viewOnly:'শুধু দেখার অনুমতি',del:'মুছুন',deleted:'মুছে ফেলা হয়েছে।',edit:'সম্পাদনা',editDb:'তথ্য সম্পাদনা',edited:'সম্পাদনা সংরক্ষিত হয়েছে।',delFail:'মুছে ফেলা যায়নি। ট্রিপে ব্যবহৃত তথ্য মোছা যায় না।',fuelLitre:'তেল (লি.)',taka:'টাকা',editEntry:'এন্ট্রি সম্পাদনা',staffEditTitle:'স্টাফ সম্পাদনা',newPin:'নতুন পিন (বদলাতে চাইলে দিন)',staffEdited:'স্টাফ তথ্য সংরক্ষিত হয়েছে।',staffDeleted:'স্টাফ অ্যাকাউন্ট মুছে ফেলা হয়েছে।'},
 en:{database:'Data Manufacture',report:'Trip Reconciliation Report',dbSub:'Vehicles, supervisors, drivers, routes and counters.',reportSub:'Up and down trips matched into full route, distance and fuel.',routes:'Routes',counters:'Counters',route:'Route',distance:'Distance (km)',direction:'Direction',up:'Up trip',down:'Down trip',nightHold:'Night hold',day:'Day',fullRoute:'Full route',pending:'Return pending',matched:'Matched',role:'Role',tripOperator:'Trip operator',fuelManager:'Fuel manager',counter:'Counter',none:'— None —',viewOnly:'View only',del:'Delete',deleted:'Deleted.',edit:'Edit',editDb:'Edit Data',edited:'Changes saved.',delFail:'Could not delete. Data used in trips cannot be removed.',fuelLitre:'Fuel (L)',taka:'Taka',editEntry:'Edit Entry',staffEditTitle:'Edit Staff',newPin:'New PIN (leave blank to keep)',staffEdited:'Staff details saved.',staffDeleted:'Staff account deleted.'},
};
