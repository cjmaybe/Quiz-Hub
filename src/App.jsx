import { useState, useCallback } from "react";

// ── Inject Nothing-style fonts ────────────────────────────────────────────────
const FontInjector = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #FAFAFA;
      --surface: #FFFFFF;
      --text: #0A0A0A;
      --text-secondary: #888888;
      --border: #E5E5E5;
      --red: #FF3B30;
      --red-soft: #FFF0EE;
      --green: #34C759;
      --green-soft: #EEFBF1;
      --amber: #FF9500;
      --amber-soft: #FFF8EE;
      --mono: 'Space Mono', 'SF Mono', 'Consolas', monospace;
      --sans: 'Space Grotesk', -apple-system, 'Segoe UI', sans-serif;
    }

    body {
      font-family: var(--sans);
      background: var(--bg);
      color: var(--text);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    ::selection {
      background: var(--red);
      color: white;
    }

    button { font-family: var(--sans); }
  `}</style>
);

// ── Dot Grid Pattern (Nothing signature) ─────────────────────────────────────
const DotGrid = ({ opacity = 0.3 }) => (
  <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none",opacity}}>
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.8" fill="#0A0A0A"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)"/>
  </svg>
);

// ── SVG Diagrams ──────────────────────────────────────────────────────────────

// Diagrams are kept but with eslint-disable comments to fix the build
/* eslint-disable no-unused-vars */
// ── Data tables / charts for the new question bank (23TPS05 Set 01) ───────────
const tblWrap = {margin:"16px 0",border:"1px solid var(--border)",borderRadius:2,background:"var(--surface)",overflowX:"auto"};
const tblBase = {width:"100%",borderCollapse:"collapse",fontFamily:"var(--mono)",fontSize:12};
const th = {padding:"8px 10px",borderBottom:"1px solid var(--border)",textAlign:"center",fontWeight:700,color:"var(--text)",background:"#F5F5F5",whiteSpace:"nowrap"};
const td = {padding:"8px 10px",borderBottom:"1px solid var(--border)",textAlign:"center",color:"#444",whiteSpace:"nowrap"};

const CompanyTable = () => (
  <div style={tblWrap}>
    <div style={{padding:"10px 12px",fontSize:12,color:"#888",lineHeight:1.5,borderBottom:"1px solid var(--border)"}}>
      Revenue, expenses and profit/loss (in $ Millions) of five companies for 2025.
    </div>
    <table style={tblBase}>
      <thead><tr>{["Company","Revenue ($M)","Expenses ($M)","Profit / Loss ($M)","Employees"].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
      <tbody>
        {[["A",120,85,"35",450],["B",200,160,"40",800],["C",95,110,"-15 (Loss)",300],["D",150,105,"45",500],["E",310,220,"90","1,200"]].map(r => (
          <tr key={r[0]}>
            <td style={{...td,fontWeight:700,color:"var(--text)"}}>Company {r[0]}</td>
            <td style={td}>{r[1]}</td><td style={td}>{r[2]}</td>
            <td style={{...td,color:String(r[3]).startsWith("-")?"var(--red)":"#444"}}>{r[3]}</td>
            <td style={td}>{r[4]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const VotesPieDiagram = () => {
  const cx = 130, cy = 120, r = 90;
  const slices = [
    {name:"Yasin",deg:80,color:"#4F81BD"},
    {name:"Sivaraman",deg:100,color:"#C0504D"},
    {name:"Vishwanath",deg:120,color:"#9BBB59"},
    {name:"Paramjeet",deg:60,color:"#8064A2"},
  ];
  let start = 0;
  const pt = (deg, rad) => {
    const a = (deg - 90) * Math.PI / 180;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };
  return (
    <div style={{margin:"16px 0",border:"1px solid var(--border)",borderRadius:2,background:"var(--surface)",padding:"12px 8px"}}>
      <div style={{fontSize:12,color:"#888",lineHeight:1.5,padding:"0 8px 8px"}}>
        Votes obtained by four students in a school leadership election. Total valid votes polled: 720.
      </div>
      <svg viewBox="0 0 260 240" width="100%" style={{display:"block",maxWidth:300,margin:"0 auto"}}>
        {slices.map(s => {
          const end = start + s.deg;
          const [x1,y1] = pt(start,r), [x2,y2] = pt(end,r);
          const [lx,ly] = pt(start + s.deg/2, r*0.62);
          const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${s.deg>180?1:0} 1 ${x2},${y2} Z`;
          start = end;
          return (
            <g key={s.name}>
              <path d={d} fill={s.color} stroke="white" strokeWidth="1"/>
              <text x={lx} y={ly-2} textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="var(--mono)">{s.name}</text>
              <text x={lx} y={ly+10} textAnchor="middle" fontSize="9" fill="white" fontFamily="var(--mono)">{s.deg}°</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const SubscriptionTable = () => (
  <div style={tblWrap}>
    <div style={{padding:"10px 12px",fontSize:12,color:"#888",lineHeight:1.5,borderBottom:"1px solid var(--border)"}}>
      Subscription of different schemes of a Mutual Fund Company over the months (₹ in crores).
    </div>
    <table style={tblBase}>
      <thead><tr>{["Month","V","W","X","Y","Z","Total"].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
      <tbody>
        {[["September",200,70,30,290,10,600],["October",120,130,70,150,290,760],["November",45,35,25,125,160,390],["December",160,110,40,115,130,555],["January",80,90,70,100,140,480],["February",130,150,30,40,390,740]].map(r => (
          <tr key={r[0]}>
            <td style={{...td,fontWeight:700,color:"var(--text)",textAlign:"left"}}>{r[0]}</td>
            {r.slice(1).map((v,i) => <td key={i} style={{...td,fontWeight:i===5?700:400,color:i===5?"var(--text)":"#444"}}>{v}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* eslint-enable no-unused-vars */

// ── Question Data ─────────────────────────────────────────────────────────────

const ALL_QUESTIONS = [
  // ═══ 23TPS05 – QUANTITATIVE APTITUDE & LOGICAL REASONING III (SET 01) ═══

  // UNIT I – Data Interpretation & Clocks
  {id:1, unit:1, unitName:"DATA & CLOCKS", q:"What is the ratio of the total revenue of Company B and Company E combined to their total expenses combined?", opts:["51 : 38","3 : 2","17 : 13","5 : 4"], ans:0, diagram:<CompanyTable/>},
  {id:2, unit:1, unitName:"DATA & CLOCKS", q:"Which company recorded the highest profit margin percentage (Profit / Revenue × 100)?", opts:["Company D","Company A","Company B","Company E"], ans:0, diagram:<CompanyTable/>},
  {id:3, unit:1, unitName:"DATA & CLOCKS", q:"What was the difference between the number of votes obtained by Yasin and Vishwanath?", opts:["80","30","40","20"], ans:0, diagram:<VotesPieDiagram/>},
  {id:4, unit:1, unitName:"DATA & CLOCKS", q:"What is the difference in the subscription of scheme V between December and February?", opts:["₹30 crores","₹80 lacs","₹240 crores","₹240 lacs"], ans:0, diagram:<SubscriptionTable/>},
  {id:5, unit:1, unitName:"DATA & CLOCKS", q:"Find the total difference between September and November.", opts:["210 cr","160 cr","45 cr","140 cr"], ans:0, diagram:<SubscriptionTable/>},
  {id:6, unit:1, unitName:"DATA & CLOCKS", q:"What is the angle between the hour hand and the minute hand at 3:30?", opts:["75°","65°","95°","105°"], ans:0},
  {id:7, unit:1, unitName:"DATA & CLOCKS", q:"At what time between 4 o'clock and 5 o'clock will the hands of a clock coincide?", opts:["21 9/11 minutes past 4","21 10/11 minutes past 4","21 2/11 minutes past 4","23 9/11 minutes past 4"], ans:0},
  {id:8, unit:1, unitName:"DATA & CLOCKS", q:"How many times in a day (24 hours) do the hands of a clock form a straight line (0° or 180°)?", opts:["44","48","24","22"], ans:0},
  {id:9, unit:1, unitName:"DATA & CLOCKS", q:"Find the reflex angle between the hands of a clock at 10:25.", opts:["197.5°","165.5°","105°","175°"], ans:0},
  {id:10, unit:1, unitName:"DATA & CLOCKS", q:"When the hands of a clock are at 180°, they are ________ spaces apart.", opts:["30 minutes","15 minutes","35 minutes","60 minutes"], ans:0},

  // UNIT II – Calendar & Series
  {id:11, unit:2, unitName:"CALENDAR & SERIES", q:"If 15th August 2011 was a Monday, what day of the week was 15th August 2012?", opts:["Wednesday","Monday","Tuesday","Thursday"], ans:0},
  {id:12, unit:2, unitName:"CALENDAR & SERIES", q:"The odd days of 646 days is ________.", opts:["2 days","3 days","5 days","4 days"], ans:0},
  {id:13, unit:2, unitName:"CALENDAR & SERIES", q:"Which of these days cannot be the last day of a century?", opts:["Saturday","Monday","Sunday","Friday"], ans:0},
  {id:14, unit:2, unitName:"CALENDAR & SERIES", q:"Today is Tuesday. What day of the week will it be after 62 days?", opts:["Monday","Sunday","Tuesday","Wednesday"], ans:0},
  {id:15, unit:2, unitName:"CALENDAR & SERIES", q:"Which of the following century years is NOT a leap year?", opts:["2100","1600","2000","2400"], ans:0},
  {id:16, unit:2, unitName:"CALENDAR & SERIES", q:"Find the missing number in the series: 4, 11, 25, 53, 109, ?", opts:["221","217","219","225"], ans:0},
  {id:17, unit:2, unitName:"CALENDAR & SERIES", q:"What comes next in the sequence: 2, 3, 10, 39, 172, ?", opts:["885","785","865","845"], ans:0},
  {id:18, unit:2, unitName:"CALENDAR & SERIES", q:"Find the missing term: 3, 7, 16, 32, 57, ?", opts:["93","85","92","98"], ans:0},
  {id:19, unit:2, unitName:"CALENDAR & SERIES", q:"Find the odd number from the given options: 35, 49, 63, 81, 91", opts:["81","35","49","63"], ans:0},
  {id:20, unit:2, unitName:"CALENDAR & SERIES", q:"Find the missing term of the series: 10, 12, 22, 34, 56, 90, ?", opts:["146","188","160","100"], ans:0},

  // UNIT III – Simple & Compound Interest
  {id:21, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"What is the time period for which ₹6,000 amounts to ₹12,000 at 20% p.a. simple interest?", opts:["5 years","2 years","3 years","4 years"], ans:0},
  {id:22, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the simple interest on ₹2,500 at 8% per annum for 2 years.", opts:["₹400","₹490","₹500","₹450"], ans:0},
  {id:23, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"₹7,000 is invested at 6% per annum for 2 years. Find the total amount.", opts:["₹7,840","₹7,800","₹8,840","₹7,700"], ans:0},
  {id:24, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the simple interest on ₹1,500 at 10% per annum for 4 years.", opts:["₹600","₹650","₹660","₹610"], ans:0},
  {id:25, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"A sum of ₹8,000 earns ₹1,200 as simple interest in 3 years. Find the rate of interest.", opts:["5%","6%","7%","10%"], ans:0},
  {id:26, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"What is the formula to find Compound Interest (compounded annually)?", opts:["CI = P(1 + R/100)ⁿ − P","CI = P(1 + R/1000)ⁿ − P","CI = P(1 + 2R/100)ⁿ − P","CI = P(1 + R/10)ⁿ − P"], ans:0},
  {id:27, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the amount on ₹2,000 at 5% per annum for 2 years, compounded annually.", opts:["₹2,205","₹2,105","₹2,005","₹2,200"], ans:0},
  {id:28, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the compound interest on ₹5,000 at 10% per annum for 2 years.", opts:["₹1,050","₹1,000","₹1,010","₹1,150"], ans:0},
  {id:29, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the amount on ₹1,500 at 10% per annum for 2 years (compounded annually).", opts:["₹1,815","₹1,810","₹1,805","₹1,915"], ans:0},
  {id:30, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the compound interest on ₹2,500 at 8% per annum for 2 years.", opts:["₹416","₹412","₹411","₹410"], ans:0},

  // UNIT IV – Course of Action & Syllogism
  {id:31, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statement: A school has reported that several students are not attending classes regularly.\nCourse of Action:\nI. Teachers should identify the reasons for poor attendance.\nII. The school should encourage parents to monitor attendance.", opts:["Both I and II follow","Only I follows","Only II follows","Neither I nor II follows"], ans:0},
  {id:32, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statement: A hospital is crowded because many patients arrive at the same time.\nCourse of Action:\nI. The hospital should improve its appointment system.\nII. The hospital should refuse treatment to all new patients.", opts:["Only I follows","Only II follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:33, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statement: Many road accidents are occurring at a particular junction.\nCourse of Action:\nI. Traffic signals or warning signs should be considered at the junction.\nII. Traffic authorities should study the causes of the accidents.", opts:["Both I and II follow","Only I follows","Only II follows","Neither I nor II follows"], ans:0},
  {id:34, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statement: Students are finding it difficult to understand a particular subject.\nCourse of Action:\nI. The teacher should provide additional explanation and practice.\nII. The subject should be removed from the curriculum immediately.", opts:["Only I follows","Only II follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:35, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statement: A company wants to improve the skills of its employees.\nCourse of Action:\nI. The company should conduct regular training programmes.\nII. Employees should be given opportunities to learn new skills.", opts:["Both I and II follow","Only I follows","Only II follows","Neither I nor II follows"], ans:0},
  {id:36, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statements: Some books are novels. All novels are interesting.\nI. Some books are interesting.\nII. All books are interesting.", opts:["Only I follows","Only II follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:37, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statements: All apples are fruits. Some fruits are sweet.\nI. Some apples are sweet.\nII. All apples are fruits.", opts:["Only II follows","Only I follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:38, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statements: No teachers are students. Some students are athletes.\nI. Some athletes are not teachers.\nII. No athletes are teachers.", opts:["Only I follows","Only II follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:39, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statements: All laptops are electronic devices. Some electronic devices are expensive.\nI. Some laptops are expensive.\nII. All laptops are electronic devices.", opts:["Only II follows","Only I follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:40, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statements: All singers are artists. All artists are creative.\nI. All singers are creative.\nII. Some creative people are singers.", opts:["Both I and II follow","Only I follows","Only II follows","Neither I nor II follows"], ans:0},

  // UNIT V – Seating Arrangement & Data Sufficiency
  {id:41, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Six friends (P, Q, R, S, T, U) are sitting in a row facing North. P and U are at the extreme ends. R is sitting to the immediate right of P. S is to the immediate left of U. Q is to the immediate left of S. Who is sitting to the immediate right of R?", opts:["T","Q","P","S"], ans:0},
  {id:42, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Five students are sitting in a row facing South. (When facing South, 'Right' is towards the observer's Left.) A is at the extreme left end. B is to the immediate right of A. C is in the middle. D is to the right of C, and E is at the extreme right end. Who is sitting to the immediate left of C?", opts:["B","A","E","D"], ans:0},
  {id:43, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Four people (M, N, O, P) are sitting in a line facing North. M is to the immediate left of N. O is to the immediate right of N. P is to the immediate right of O. Who is sitting at the extreme left end?", opts:["M","N","O","P"], ans:0},
  {id:44, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Eight people P, Q, R, S, T, U, V and W sit around a circle. P is opposite T. Q is opposite U. R is opposite V. Who is opposite S?", opts:["W","Q","P","T"], ans:0},
  {id:45, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Six students A, B, C, D, E and F sit around a circular table. A is immediately right of B. C is immediately right of A. Who is immediately left of A?", opts:["B","A","E","D"], ans:0},
  {id:46, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Data Sufficiency: What is the perimeter of a square?\nI. Each side is 6 cm.\nII. All four sides are equal.", opts:["Statement I alone is sufficient","Statement II alone is sufficient","Both statements together are sufficient","Either statement alone is sufficient"], ans:0},
  {id:47, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Data Sufficiency: How many books does Arun have?\nI. Arun has 5 more books than Bala.\nII. Bala has 10 books.", opts:["Both statements together are sufficient","Statement I alone is sufficient","Statement II alone is sufficient","Either statement alone is sufficient"], ans:0},
  {id:48, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Data Sufficiency: What is the value of z?\nI. z − 3 = 9.\nII. z is greater than 5.", opts:["Statement I alone is sufficient","Statement II alone is sufficient","Both statements together are sufficient","Either statement alone is sufficient"], ans:0},
  {id:49, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Data Sufficiency: How many students are in a class?\nI. There are 20 boys.\nII. There are 15 girls.", opts:["Both statements together are sufficient","Statement I alone is sufficient","Statement II alone is sufficient","Either statement alone is sufficient"], ans:0},
  {id:50, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Data Sufficiency: What is the value of x/y?\nI. x = 12.\nII. y = 3.", opts:["Both statements together are sufficient","Statement I alone is sufficient","Statement II alone is sufficient","Either statement alone is sufficient"], ans:0}
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LETTERS = ["A","B","C","D"];

// ── Main App ──────────────────────────────────────────────────────────────────
export default function QuizApp() {
  const UNITS = [
    {id:0, label:"ALL UNITS", short:"ALL", count: ALL_QUESTIONS.length},
    {id:1, label:"DATA & CLOCKS", short:"01", count: ALL_QUESTIONS.filter(q=>q.unit===1).length},
    {id:2, label:"CALENDAR & SERIES", short:"02", count: ALL_QUESTIONS.filter(q=>q.unit===2).length},
    {id:3, label:"SIMPLE & COMPOUND INTEREST", short:"03", count: ALL_QUESTIONS.filter(q=>q.unit===3).length},
    {id:4, label:"COURSE OF ACTION & SYLLOGISM", short:"04", count: ALL_QUESTIONS.filter(q=>q.unit===4).length},
    {id:5, label:"SEATING & DATA SUFFICIENCY", short:"05", count: ALL_QUESTIONS.filter(q=>q.unit===5).length},
  ];

  const [screen, setScreen] = useState("home");
  const [selectedUnit, setSelectedUnit] = useState(0);
  const [shuffleQ, setShuffleQ] = useState(false);
  const [shuffleOpts, setShuffleOpts] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [optMapping, setOptMapping] = useState({});
  const [fade, setFade] = useState(true);

  const startQuiz = useCallback(() => {
    let qs = selectedUnit === 0 ? ALL_QUESTIONS : ALL_QUESTIONS.filter(q => q.unit === selectedUnit);
    if (shuffleQ) qs = shuffle(qs);
    const mapping = {};
    qs.forEach(q => { mapping[q.id] = shuffleOpts ? shuffle([0,1,2,3]) : [0,1,2,3]; });
    setQuestions(qs);
    setOptMapping(mapping);
    setAnswers({});
    setCurrent(0);
    setSubmitted(false);
    setScreen("quiz");
  }, [selectedUnit, shuffleQ, shuffleOpts]);

  const selectAnswer = (qId, displayIdx) => {
    if (submitted) return;
    setAnswers(prev => ({...prev, [qId]: displayIdx}));
  };

  const goNext = () => {
    if (current < questions.length - 1) {
      setFade(false);
      setTimeout(() => { setCurrent(c => c + 1); setFade(true); }, 100);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setFade(false);
      setTimeout(() => { setCurrent(c => c - 1); setFade(true); }, 100);
    }
  };

  const submitQuiz = () => {
    setSubmitted(true);
  };

  const score = submitted ? questions.reduce((acc, q) => {
    const map = optMapping[q.id] || [0,1,2,3];
    const chosen = answers[q.id];
    if (chosen === undefined) return acc;
    return map[chosen] === q.ans ? acc + 1 : acc;
  }, 0) : 0;

  const pct = questions.length ? Math.round(score / questions.length * 100) : 0;
  const q = questions[current];
  const map = q ? (optMapping[q.id] || [0,1,2,3]) : [];

  // BUG FIX: define allAnswered so the submit button condition works
  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  // Shared label style
  const labelStyle = {fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#888",fontFamily:"var(--mono)"};

  // ── HOME SCREEN ───────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <>
        <FontInjector/>
        <div style={{minHeight:"100vh",background:"var(--bg)",position:"relative"}}>
          <DotGrid opacity={0.15}/>

          <header style={{position:"relative",zIndex:2,borderBottom:"1px solid var(--border)",background:"var(--bg)"}}>
            <div style={{maxWidth:640,margin:"0 auto",padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:8,height:8,background:"var(--red)",borderRadius:"50%"}}/>
                <span style={{fontSize:14,fontWeight:700,letterSpacing:1,fontFamily:"var(--mono)"}}>QUIZ HUB</span>
              </div>
              <span
              style={{
                fontSize: 11,
                color: "#888",
                fontWeight: 500,
                fontFamily: "Noto Sans Tamil, Segoe UI, sans-serif",
                whiteSpace: "nowrap"
              }}
            >
              BY சிஜே.
            </span>
            </div>
          </header>

          <main style={{position:"relative",zIndex:2,maxWidth:640,margin:"0 auto",padding:"48px 24px 80px"}}>
            {/* Hero */}
            <div style={{marginBottom:56}}>
              <h1 style={{fontSize:42,fontWeight:700,lineHeight:1.05,letterSpacing:-1.5,margin:"0 0 12px",color:"var(--text)"}}>
                Aptitude<br/>
                <span style={{color:"var(--red)"}}>Practice</span>
              </h1>
              <p style={{fontSize:15,color:"#888",lineHeight:1.6,maxWidth:380,fontWeight:400}}>
                {ALL_QUESTIONS.length} questions across {UNITS.length - 1} units. Select, practice, improve.
              </p>
            </div>

            {/* Unit Selection */}
            <div style={{marginBottom:40}}>
              <div style={{...labelStyle,marginBottom:16,paddingLeft:1}}>SELECT UNIT</div>
              <div style={{display:"flex",flexDirection:"column",gap:0,borderTop:"1px solid var(--border)"}}>
                {UNITS.map(u => {
                  const active = selectedUnit === u.id;
                  return (
                    <button key={u.id} onClick={() => setSelectedUnit(u.id)} style={{
                      display:"flex",alignItems:"center",gap:16,padding:"16px 4px",
                      borderBottom:"1px solid var(--border)",background:"none",borderLeft:"none",borderRight:"none",
                      cursor:"pointer",textAlign:"left",width:"100%",transition:"all .15s",
                    }}>
                      <span style={{fontFamily:"var(--mono)",fontSize:13,fontWeight:700,color: active ? "var(--red)" : "#CCC",width:28,transition:"color .15s"}}>{u.short}</span>
                      <span style={{flex:1,fontSize:15,fontWeight: active ? 700 : 400,color: active ? "var(--text)" : "#666",transition:"all .15s",letterSpacing: active ? 0.5 : 0}}>{u.label}</span>
                      <span style={{fontFamily:"var(--mono)",fontSize:11,color:"#CCC",fontWeight:400}}>{String(u.count).padStart(2,"0")}</span>
                      <span style={{width:16,height:16,borderRadius:"50%",border: active ? "none" : "1.5px solid #DDD",background: active ? "var(--red)" : "transparent",transition:"all .15s",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {active && <span style={{color:"white",fontSize:9}}>✓</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggles */}
            <div style={{marginBottom:40}}>
              <div style={{...labelStyle,marginBottom:16,paddingLeft:1}}>PREFERENCES</div>
              <div style={{display:"flex",gap:12}}>
                {[
                  {label:"Shuffle Questions", val:shuffleQ, set:setShuffleQ},
                  {label:"Shuffle Options", val:shuffleOpts, set:setShuffleOpts},
                ].map(t => (
                  <button key={t.label} onClick={() => t.set(p => !p)} style={{
                    flex:1,padding:"14px 16px",borderRadius:2,
                    border: t.val ? "1.5px solid var(--red)" : "1.5px solid var(--border)",
                    background: t.val ? "var(--red-soft)" : "var(--surface)",cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"space-between",
                    transition:"all .15s",fontSize:13,fontWeight: t.val ? 600 : 400,
                    color: t.val ? "var(--red)" : "#666",
                  }}>
                    <span>{t.label}</span>
                    <span style={{
                      width:36,height:20,borderRadius:10,background: t.val ? "var(--red)" : "#E5E5E5",
                      position:"relative",transition:"background .2s",flexShrink:0,
                    }}>
                      <span style={{
                        width:16,height:16,borderRadius:"50%",background:"white",position:"absolute",top:2,
                        left: t.val ? 18 : 2,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",
                      }}/>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Start */}
            <button onClick={startQuiz} style={{
              width:"100%",padding:"18px",borderRadius:2,border:"none",
              background:"var(--red)",color:"white",
              fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:2,
              fontFamily:"var(--mono)",transition:"all .15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background="#E0342B"; }}
              onMouseLeave={e => { e.currentTarget.style.background="var(--red)"; }}
            >
              START QUIZ →
            </button>
          </main>
        </div>
      </>
    );
  }

  // ── RESULT SCREEN ─────────────────────────────────────────────────────────
  if (screen === "result") {
    const gradeColor = pct >= 80 ? "var(--green)" : pct >= 60 ? "var(--amber)" : "var(--red)";
    const gradeLabel = pct >= 80 ? "PASS" : pct >= 60 ? "AVERAGE" : "FAIL";
    const wrongCount = Object.keys(answers).filter(k => {
      const m = optMapping[Number(k)] || [0,1,2,3];
      const qx = questions.find(qx => qx.id === Number(k));
      return qx && m[answers[k]] !== qx.ans;
    }).length;
    const skippedCount = questions.length - Object.keys(answers).length;

    return (
      <>
        <FontInjector/>
        <div style={{minHeight:"100vh",background:"var(--bg)"}}>
          <header style={{borderBottom:"1px solid var(--border)",background:"var(--bg)",position:"sticky",top:0,zIndex:20}}>
            <div style={{maxWidth:640,margin:"0 auto",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:8,height:8,background:"var(--red)",borderRadius:"50%"}}/>
                <span style={{fontSize:14,fontWeight:700,letterSpacing:1,fontFamily:"var(--mono)"}}>RESULTS</span>
              </div>
              <button onClick={() => setScreen("home")} style={{
                padding:"6px 14px",borderRadius:2,border:"1.5px solid var(--border)",background:"var(--surface)",
                cursor:"pointer",fontSize:11,fontWeight:600,color:"#666",fontFamily:"var(--mono)",letterSpacing:1,transition:"all .15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "#666"; }}
              >← BACK</button>
            </div>
          </header>

          <main style={{maxWidth:640,margin:"0 auto",padding:"40px 24px 80px"}}>
            {/* Score */}
            <div style={{textAlign:"center",marginBottom:48,paddingBottom:40,borderBottom:"1px solid var(--border)"}}>
              <div style={{...labelStyle,marginBottom:16,color:gradeColor}}>{gradeLabel}</div>
              <div style={{fontFamily:"var(--mono)",fontSize:72,fontWeight:700,lineHeight:1,color:gradeColor,letterSpacing:-4}}>
                {pct}<span style={{fontSize:24,color:"#CCC"}}>%</span>
              </div>
              <div style={{fontSize:14,color:"#888",marginTop:8,fontFamily:"var(--mono)"}}>
                {score}/{questions.length} CORRECT
              </div>

              <div style={{display:"flex",justifyContent:"center",gap:40,marginTop:32}}>
                {[
                  {label:"CORRECT",val:score,color:"var(--green)"},
                  {label:"WRONG",val:wrongCount,color:"var(--red)"},
                  {label:"SKIPPED",val:skippedCount,color:"var(--amber)"},
                ].map(s => (
                  <div key={s.label} style={{textAlign:"center"}}>
                    <div style={{fontFamily:"var(--mono)",fontSize:28,fontWeight:700,color:s.color,lineHeight:1}}>{String(s.val).padStart(2,"0")}</div>
                    <div style={{...labelStyle,fontSize:8,marginTop:6,color:s.color}}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Bar */}
              <div style={{maxWidth:300,margin:"24px auto 0",height:3,background:"#E5E5E5",borderRadius:0,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:gradeColor,transition:"width .6s ease"}}/>
              </div>
            </div>

            {/* Review */}
            <div style={{...labelStyle,marginBottom:20,paddingLeft:1}}>REVIEW</div>
            <div style={{display:"flex",flexDirection:"column",gap:0}}>
              {questions.map((qx, idx) => {
                const m = optMapping[qx.id] || [0,1,2,3];
                const chosen = answers[qx.id];
                const correct = chosen !== undefined && m[chosen] === qx.ans;
                const isWrong = chosen !== undefined && !correct;
                const isSkipped = chosen === undefined;
                const borderColor = correct ? "var(--green)" : isWrong ? "var(--red)" : "var(--amber)";
                return (
                  <details key={qx.id} style={{borderBottom:"1px solid var(--border)"}}>
                    <summary style={{padding:"14px 0",cursor:"pointer",display:"flex",alignItems:"center",gap:12,fontSize:13,fontWeight:400,color:"var(--text)",listStyle:"none",userSelect:"none"}}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:borderColor,flexShrink:0}}/>
                      <span style={{fontFamily:"var(--mono)",fontSize:11,color:"#CCC",fontWeight:400,width:28,flexShrink:0}}>Q{String(idx+1).padStart(2,"0")}</span>
                      <span style={{flex:1,lineHeight:1.4,color:"#444"}}>{qx.q.slice(0,70)}{qx.q.length > 70 ? "..." : ""}</span>
                      <span style={{color:"#CCC",fontSize:10,fontFamily:"var(--mono)",flexShrink:0}}>+</span>
                    </summary>
                    <div style={{padding:"0 0 16px 18px",borderLeft:"2px solid var(--border)",marginLeft:2,paddingLeft:18}}>
                      <div style={{fontSize:14,fontWeight:500,color:"var(--text)",marginBottom:12,lineHeight:1.6,whiteSpace:"pre-line"}}>{qx.q}</div>
                      {qx.diagram && <div style={{marginBottom:12}}>{qx.diagram}</div>}
                      <div style={{fontSize:12,color:"var(--green)",fontWeight:600,fontFamily:"var(--mono)",marginBottom:4}}>
                        ✓ {qx.opts[qx.ans]}
                      </div>
                      {isWrong && (
                        <div style={{fontSize:12,color:"var(--red)",fontWeight:600,fontFamily:"var(--mono)"}}>
                          ✗ {qx.opts[m[chosen]]}
                        </div>
                      )}
                      {isSkipped && (
                        <div style={{fontSize:12,color:"var(--amber)",fontWeight:600,fontFamily:"var(--mono)"}}>
                          — SKIPPED
                        </div>
                      )}
                    </div>
                  </details>
                );
              })}
            </div>
          </main>
        </div>
      </>
    );
  }

  // ── QUIZ SCREEN ───────────────────────────────────────────────────────────
  if (!q) return null;
  const chosenDisplay = answers[q.id];
  const getOptState = (displayIdx) => {
    const realIdx = map[displayIdx];
    if (!submitted) return chosenDisplay === displayIdx ? "selected" : "";
    if (realIdx === q.ans) return "correct";
    if (chosenDisplay === displayIdx && realIdx !== q.ans) return "wrong";
    return "";
  };
  const progressPct = ((current + 1) / questions.length) * 100;

  const optStyle = (state) => {
    const styles = {
      selected: {border:"1.5px solid var(--red)",bg:"var(--red-soft)",letterBg:"var(--red)",letterColor:"white",textColor:"var(--red)",textWeight:600},
      correct: {border:"1.5px solid var(--green)",bg:"var(--green-soft)",letterBg:"var(--green)",letterColor:"white",textColor:"var(--green)",textWeight:600},
      wrong: {border:"1.5px solid var(--red)",bg:"var(--red-soft)",letterBg:"var(--red)",letterColor:"white",textColor:"var(--red)",textWeight:600},
      "": {border:"1.5px solid var(--border)",bg:"var(--surface)",letterBg:"#F5F5F5",letterColor:"#AAA",textColor:"var(--text)",textWeight:400},
    };
    return styles[state] || styles[""];
  };

  return (
    <>
      <FontInjector/>
      <div style={{minHeight:"100vh",background:"var(--bg)"}}>
        {/* Header */}
        <header style={{borderBottom:"1px solid var(--border)",background:"var(--bg)",position:"sticky",top:0,zIndex:20}}>
          <div style={{maxWidth:640,margin:"0 auto",padding:"16px 24px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:8,height:8,background:"var(--red)",borderRadius:"50%"}}/>
                <span style={{fontSize:11,fontWeight:600,letterSpacing:1.5,fontFamily:"var(--mono)",color:"#888"}}>{q.unitName}</span>
              </div>
              <span style={{fontFamily:"var(--mono)",fontSize:13,fontWeight:700,color:"var(--text)"}}>
                {String(current+1).padStart(2,"0")}<span style={{color:"#CCC"}}>/{String(questions.length).padStart(2,"0")}</span>
              </span>
            </div>
            <div style={{height:2,background:"#E5E5E5",borderRadius:0,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${progressPct}%`,background:"var(--red)",transition:"width .25s ease"}}/>
            </div>
          </div>
        </header>

        <main style={{maxWidth:640,margin:"0 auto",padding:"24px 24px 120px"}}>
          {/* Dot nav */}
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:28}}>
            {questions.map((qx, i) => {
              const m2 = optMapping[qx.id] || [0,1,2,3];
              const a2 = answers[qx.id];
              const isCorrect = submitted && a2 !== undefined && m2[a2] === qx.ans;
              const isWrong = submitted && a2 !== undefined && m2[a2] !== qx.ans;
              let bg = "#ECECEC", fg = "#BBB";
              if (i === current) { bg = "var(--red)"; fg = "white"; }
              else if (isCorrect) { bg = "var(--green)"; fg = "white"; }
              else if (isWrong) { bg = "var(--red)"; fg = "white"; }
              else if (a2 !== undefined) { bg = "#CCC"; fg = "white"; }
              return (
                <button key={qx.id} onClick={() => setCurrent(i)} style={{
                  width:26,height:26,borderRadius:1,border:"none",background:bg,
                  color:fg,cursor:"pointer",fontSize:9,fontWeight:700,fontFamily:"var(--mono)",
                  transition:"all .1s",padding:0,
                }}>{i+1}</button>
              );
            })}
          </div>

          {/* Question */}
          <div style={{
            opacity: fade ? 1 : 0,transform: fade ? "translateY(0)" : "translateY(4px)",
            transition:"opacity .1s ease, transform .1s ease",
          }}>
            <div style={{...labelStyle,marginBottom:16}}>
              QUESTION {String(current+1).padStart(2,"0")}
            </div>

            <div style={{fontSize:17,fontWeight:600,lineHeight:1.7,color:"var(--text)",marginBottom:20,letterSpacing:-0.2,whiteSpace:"pre-line"}}>
              {q.q}
            </div>

            {q.diagram && <div style={{marginBottom:20}}>{q.diagram}</div>}

            {/* Options */}
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[0, 1, 2, 3].map((displayIdx) => {
                const opt = q.opts[map[displayIdx]];
                const state = getOptState(displayIdx);
                const s = optStyle(state);
                const disabled = submitted;
                return (
                  <button key={displayIdx} onClick={() => selectAnswer(q.id, displayIdx)} disabled={disabled} style={{
                    padding:"14px 16px",borderRadius:2,border: s.border,background:s.bg,
                    cursor: disabled ? "default" : "pointer",textAlign:"left",fontSize:14,
                    display:"flex",alignItems:"center",gap:14,transition:"all .12s",
                    fontWeight: s.textWeight,color:s.textColor,width:"100%",outline:"none",
                    fontFamily:"var(--sans)",
                  }}
                    onMouseEnter={e => { if (!disabled && state === "") { e.currentTarget.style.borderColor = "#CCC"; e.currentTarget.style.background = "#FAFAFA"; }}}
                    onMouseLeave={e => { if (!disabled && state === "") { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface)"; }}}
                  >
                    <span style={{
                      width:26,height:26,borderRadius:2,background:s.letterBg,color:s.letterColor,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:10,fontWeight:700,flexShrink:0,fontFamily:"var(--mono)",transition:"all .12s",
                    }}>
                      {state === "correct" ? "✓" : state === "wrong" ? "✗" : LETTERS[displayIdx]}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </main>

        {/* Bottom Nav */}
        <div style={{
          position:"fixed",bottom:0,left:0,right:0,
          background:"var(--bg)",borderTop:"1px solid var(--border)",
          padding:"14px 24px",zIndex:20,
        }}>
          <div style={{
            maxWidth:640,margin:"0 auto",
            display:"flex",justifyContent:"space-between",alignItems:"center",
          }}>
            {/* Prev */}
            <button onClick={goPrev} disabled={current === 0} style={{
              padding:"10px 20px",borderRadius:2,
              border:"1.5px solid var(--border)",
              background: current === 0 ? "var(--bg)" : "var(--surface)",
              cursor: current === 0 ? "not-allowed" : "pointer",
              fontSize:11,fontWeight:600,
              color: current === 0 ? "#DDD" : "#666",
              fontFamily:"var(--mono)",letterSpacing:1,
            }}>
              ← PREV
            </button>

            {/* Right side */}
            <div style={{display:"flex",gap:10}}>
              {!submitted && current < questions.length - 1 && (
                <button onClick={goNext} style={{
                  padding:"10px 20px",borderRadius:2,
                  border:"1.5px solid var(--border)",background:"var(--surface)",
                  cursor:"pointer",fontSize:11,fontWeight:600,color:"#666",
                  fontFamily:"var(--mono)",letterSpacing:1,
                }}>
                  NEXT →
                </button>
              )}

              {/* BUG FIX: allAnswered now references the variable defined above */}
              {!submitted && allAnswered && (
                <button onClick={submitQuiz} style={{
                  padding:"10px 24px",borderRadius:2,border:"none",
                  background:"var(--red)",color:"white",
                  fontSize:11,fontWeight:700,cursor:"pointer",
                  fontFamily:"var(--mono)",letterSpacing:1,
                }}>
                  SUBMIT
                </button>
              )}

              {submitted && (
                <button onClick={() => setScreen("result")} style={{
                  padding:"10px 24px",borderRadius:2,
                  border:"1.5px solid var(--red)",background:"transparent",
                  color:"var(--red)",fontSize:11,fontWeight:700,cursor:"pointer",
                  fontFamily:"var(--mono)",letterSpacing:1,
                }}>
                  VIEW RESULTS →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
