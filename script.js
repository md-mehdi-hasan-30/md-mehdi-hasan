const config = window.SITE_CONFIG || {formspreeEndpoint:"",socialLinks:{}};

document.querySelectorAll("[data-social]").forEach(link=>{
  const url=config.socialLinks?.[link.dataset.social]||"";
  if(url){link.href=url;link.target="_blank";link.rel="noopener noreferrer";}
});

const menuBtn=document.querySelector(".menu-btn"), nav=document.querySelector(".nav-links");
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();

const form=document.getElementById("contactForm"), status=document.getElementById("formStatus");
form.addEventListener("submit",async e=>{
  e.preventDefault(); status.className="form-status";
  if(!config.formspreeEndpoint){
    status.classList.add("error");
    status.textContent="Form is not connected yet. Open config.js and add your Formspree endpoint.";
    return;
  }
  const btn=form.querySelector("button"); btn.disabled=true; btn.textContent="Sending...";
  try{
    const r=await fetch(config.formspreeEndpoint,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});
    if(r.ok){form.reset();status.classList.add("success");status.textContent="Thank you! Your message has been sent successfully.";}
    else{status.classList.add("error");status.textContent="Could not send the message. Check your Formspree endpoint.";}
  }catch(err){status.classList.add("error");status.textContent="Could not send the message. Please check your internet connection.";}
  finally{btn.disabled=false;btn.textContent="Send Message";}
});
