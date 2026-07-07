const http = require("http");
const fs = require("fs");
const path = require("path");
const { knowledgeBase } = require("./knowledge-base");
const root = __dirname;
loadEnvFile();
const port = Number(process.env.PORT || 5174);
const baseUrl = (process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1").replace(/\/+$/, "");
const model = process.env.OPENROUTER_MODEL || "openrouter/free";
const appReferer = process.env.OPENROUTER_SITE_URL || `http://127.0.0.1:${port}`;
const appTitle = process.env.OPENROUTER_APP_TITLE || "Festrips AI Chatbot MVP";
function loadEnvFile(){const p=path.join(root,'.env');if(!fs.existsSync(p))return;for(const line of fs.readFileSync(p,'utf8').split(/\r?\n/)){const s=line.trim();if(!s||s.startsWith('#'))continue;const i=s.indexOf('=');if(i>-1&&!process.env[s.slice(0,i).trim()])process.env[s.slice(0,i).trim()]=s.slice(i+1).trim();}}
function json(res,status,payload){res.writeHead(status,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});res.end(JSON.stringify(payload));}
function readJson(req){return new Promise((resolve,reject)=>{let body='';req.on('data',c=>body+=c);req.on('end',()=>{try{resolve(body?JSON.parse(body):{});}catch(e){reject(e);}});req.on('error',reject);});}
function langName(code){return code==='ko'?'Korean':code==='tl'?'Tagalog / Filipino':'English';}
async function handleChat(req,res){const apiKey=process.env.OPENROUTER_API_KEY;if(!apiKey)return json(res,500,{error:'OPENROUTER_API_KEY is not set.'});try{const {message='',language='en',history=[]}=await readJson(req);if(!String(message).trim())return json(res,400,{error:'Message is required.'});const system=`You are the official Festrips AI Support Assistant. Answer in ${langName(language)}.

Use only the Festrips knowledge base below. If the answer is not explicitly supported by the knowledge base, say the Festrips team should review it. Do not invent policies, deadlines, exceptions, supplier names, or direct contact instructions.

Critical rules:
- Do not guarantee bookings, fares, availability, refunds, changes, cancellations, or schedule changes.
- Do not approve or calculate refunds.
- Do not say refunds are generally available.
- Do not tell customers to contact airlines, hotels, or suppliers directly.
- Route booking-specific, payment, ticket, voucher, refund, cancellation, date-change, passenger-detail, corporate, and B2B issues to Festrips support.
- If a booking-specific issue appears, ask for the booking code if it has not been provided.
- If the user already provided a booking code, acknowledge it and say Festrips support can review the case using that code. Do not ask for the same code again.
- For booking-specific issues, ask the user to complete the support request form below with name, email, contact number, booking code, and concern details.
- If the frontend collects the request through a form, say Festrips support will review the submitted details and contact the customer after checking.
- Keep answers concise and practical.

Response format:
- Do not write long paragraphs.
- Use this structure whenever possible:
  1. One short direct answer sentence.
  2. 2 to 4 bullet points for key details.
  3. A blank line, then a final "Next step:" line when support review, booking code, payment, or confirmation is involved.
- Keep each bullet under 18 words.
- Do not use markdown bold, asterisks, or headings.
- Write "Next step:" as plain text, not "**Next step:**".
- Avoid markdown tables.

FESTRIPS KNOWLEDGE BASE:
${knowledgeBase}`;const r=await fetch(`${baseUrl}/chat/completions`,{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json','HTTP-Referer':appReferer,'X-Title':appTitle},body:JSON.stringify({model,messages:[{role:'system',content:system},...history.slice(-6),{role:'user',content:String(message)}],temperature:0.1,max_tokens:450})});const data=await r.json().catch(()=>({}));if(!r.ok)return json(res,r.status,{error:data.error?.message||data.detail?.message||data.message||'OpenRouter request failed.'});const answer=(data.choices?.[0]?.message?.content||'').trim()||'Festrips support should review this request.\n\nNext step: Please share your booking code so Festrips support can assist.';json(res,200,{answer,model,provider:'openrouter'});}catch(e){json(res,500,{error:e.message||'Server error'});}}
function serve(req,res){const u=new URL(req.url,`http://${req.headers.host}`);let pathname=u.pathname;if(pathname==='/'||pathname.endsWith('/'))pathname=pathname+'index.html';const safePath=pathname.replace(/^\/+/, '');const file=path.resolve(root,safePath);if(!file.startsWith(path.resolve(root))){res.writeHead(403);res.end('Forbidden');return;}fs.readFile(file,(err,buf)=>{if(err){res.writeHead(404);res.end('Not found');return;}const ext=path.extname(file);const type={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8'}[ext]||'application/octet-stream';res.writeHead(200,{"Content-Type":type});res.end(buf);});}
http.createServer((req,res)=>{if(req.method==='POST'&&req.url==='/api/chat')return handleChat(req,res);if(req.method==='GET')return serve(req,res);res.writeHead(405);res.end('Method not allowed');}).listen(port,()=>console.log(`Festrips chatbot versions running on port ${port}`));

