// To be debugged, not used in bubblesort anymore.
document.addEventListener('DOMContentLoaded',loadNav());
function loadNav()
{
    console.log('Loaded the dom');
    fetch("./navBar.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("#nav-bar").innerHTML = data;
    const current = window.location.href;
    const active = ["bg-gray-400", "text-black"];
    const inactive = ["hover:bg-gray-400",  "hover:text-gray-800"];
    const navLinks = Array.from(document.getElementsByTagName('nav')[0].children);
    navLinks.forEach(l=>
        { if (l.href == current) 
            {	l.classList.add(active[0]);
                l.classList.add(active[1]);
            } 
            else
            {	l.classList.add(inactive[0]);
                l.classList.add(inactive[1]);
            }
        });

  })
  .catch(error => console.log('error', error));
}

