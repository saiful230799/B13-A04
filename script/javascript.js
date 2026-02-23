let jobs = [
    { id: 1, company: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "all" },
    { id: 2, company: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$80,000 - $120,000", description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "all" },
    { id: 3, company: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA", type: "Full-time", salary: "$125,000 - $165,000", description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status: "all" },
    { id: 4, company: "CloudFirst Inc", position: "Backend Developer", location: "Seattle, WA", type: "Full-time", salary: "$140,000 - $190,000", description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices.", status: "all" },
    { id: 5, company: "Innovation Labs", position: "UI/UX Engineer", location: "Austin, TX", type: "Full-time", salary: "$110,000 - $150,000", description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills required.", status: "all" },
    { id: 6, company: "MegaCorp Solutions", position: "JavaScript Developer", location: "New York, NY", type: "Full-time", salary: "$130,000 - $175,000", description: "Build enterprise applications with JavaScript and modern frameworks. Competitive compensation and health insurance.", status: "all" },
    { id: 7, company: "StartupXYZ", position: "Full Stack Engineer", location: "Remote", type: "Full-time", salary: "$120,000 - $160,000", description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required.", status: "all" },
    { id: 8, company: "TechCorp Industries", position: "Senior Frontend Developer", location: "San Francisco, CA", type: "Full-time", salary: "$130,000 - $175,000", description: "Build scalable web applications using React and TypeScript. Work with a talented team on cutting-edge projects.", status: "all" }
];

let currentTab = 'all';

const jobsContainer = document.querySelector('.space-y-4');
const totalCountEl = document.getElementById('total-count');
const interviewCountEl = document.getElementById('interview-count');
const rejectedCountEl = document.getElementById('rejected-count');
const tabJobsCountEl = document.querySelector('.text-slate-500.font-medium');
const tabButtons = document.querySelectorAll('.flex.gap-2.mb-8 button');


function renderUI() {
    jobsContainer.innerHTML = '';
    

    let filteredJobs = jobs;
    if (currentTab !== 'all') {
        filteredJobs = jobs.filter(job => job.status === currentTab);
    }

    totalCountEl.innerText = jobs.length;
    interviewCountEl.innerText = jobs.filter(j => j.status === 'interview').length;
    rejectedCountEl.innerText = jobs.filter(j => j.status === 'rejected').length;
    tabJobsCountEl.innerText = `${filteredJobs.length} jobs`;

    if (filteredJobs.length === 0) {
    jobsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-center w-full">
            <img src="../img/Vector.png" class="w-20 mb-4" class="w-24 mb-6 opacity-80" alt="empty">
            
            <h2 class="text-3xl font-bold text-[#0D2344]">No jobs available</h2>
            
            <p class="text-slate-400 mt-2 text-lg font-medium">Check back soon for new job opportunities</p>
        </div>
    `;
    return;
}

    filteredJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = "card bg-base-100 shadow-sm border border-slate-100 p-6 relative mb-4";
        card.innerHTML = `
            <button onclick="deleteJob(${job.id})" class="btn btn-circle btn-ghost btn-xs absolute right-4 top-4 border border-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
            <div class="mb-4">
                <h3 class="text-xl font-bold text-blue-900">${job.company}</h3>
                <p class="text-slate-500">${job.position}</p>
            </div>
            <div class="flex gap-2 text-sm text-slate-400 mb-4">
                <span>${job.location}</span> • <span>${job.type}</span> • <span>${job.salary}</span>
            </div>
            <div class="badge ${job.status === 'interview' ? 'badge-success text-white' : job.status === 'rejected' ? 'badge-error text-white' : 'badge-info bg-blue-50'} badge-outline rounded-md p-3 mb-4 text-xs font-bold uppercase">
                ${job.status === 'all' ? 'NOT APPLIED' : job.status}
            </div>
            <p class="text-slate-600 mb-6 text-sm">${job.description}</p>
            <div class="flex gap-2">
                <button onclick="updateStatus(${job.id}, 'interview')" class="btn ${job.status === 'interview' ? 'btn-success text-white' : 'btn-outline btn-success'} btn-sm border-2">INTERVIEW</button>
                <button onclick="updateStatus(${job.id}, 'rejected')" class="btn ${job.status === 'rejected' ? 'btn-error text-white' : 'btn-outline btn-error'} btn-sm border-2">REJECTED</button>
            </div>
        `;
        jobsContainer.appendChild(card);
    });
}
function updateStatus(id, newStatus) {
    const jobIndex = jobs.findIndex(j => j.id === id);
    if (jobIndex !== -1) {
        jobs[jobIndex].status = newStatus;
        renderUI();
    }
}

function deleteJob(id) {
    jobs = jobs.filter(job => job.id !== id);
    renderUI();
}
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        
        tabButtons.forEach(b => {
            b.classList.remove('btn-primary');
            b.classList.add('btn-ghost', 'bg-white', 'border-slate-200');
        });
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-ghost', 'bg-white', 'border-slate-200');

        currentTab = btn.innerText.toLowerCase();
        renderUI();
    });
});
renderUI();