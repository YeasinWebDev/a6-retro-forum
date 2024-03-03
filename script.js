

const fetchData = async (type) => {
    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'block';
    let data
    if (type) {
        data = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${type}`);
    } else {
        data = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts")
    }

    const res = await data.json();
    setTimeout(() => {
        spinner.style.display = 'none';
        showingData(res.posts)
    }, 2000);
}


const showingData = (data) => {
    const container = document.querySelector(".contentLeft")
    container.innerHTML = ''
    data.map((item) => {
        const div = document.createElement("div");
        div.classList = "bg-[#f3f3f5] p-5 md:p-10 border-b-2 border-black border-dashed"
        div.innerHTML = `
                <div class="img w-10 h-10 mr-4 rounded-lg relative bg-transparent m-4 md:m-0">
                <div class="dot w-4 h-4 bg-${item.isActive ? "green" : "red"}-800 rounded-full absolute right-[-8px] top-[-8px]"></div>
                <img class="w-full h-full rounded-lg"
                    src="${item.image}"
                    alt="">
            </div>
            <div class="text">
                <div class="top">
                <div class="tag  bg-[#f3f3f5] font-bold">Author: ${item.author?.name}</div>
                    <div class="tag bg-[#f3f3f5] font-bold"># ${item.category}</div>
                    <h1 class="bg-[#f3f3f5] py-3 font-bold px-2 md:px-0 text-lg md:text-xl">
                        ${item.title}
                    </h1>
                    <p class=" bg-[#f3f3f5] py-2">
                        ${item.description}
                    </p>
                </div>
                <div class="bottom flex bg-[#f3f3f5] md:pt-2 flex-wrap">
                    <div class="flex gap-3 items-center bg-[#f3f3f5] text-xl">
                        <i class="fa-regular fa-message bg-[#f3f3f5]"></i>
                        <span class="mb-1 bg-[#f3f3f5]">${item.comment_count}</span>
                    </div>
                    <div class="flex gap-3 items-center mx-10 bg-[#f3f3f5] text-xl">
                        <i class="fa-regular fa-eye"></i>
                        <span class="mb-1 bg-[#f3f3f5]">${item.view_count}</span>
                    </div>
                    <div class="flex gap-3 items-center bg-[#f3f3f5] text-xl">
                        <i class="fa-regular fa-clock"></i>
                        <span class="mb-1 bg-[#f3f3f5]">${item.posted_time} min</span>
                    </div>
                    <div
                        class=" text-xl md:ml-80 w-10 h-10 flex justify-center items-center rounded-full cursor-pointer bg-white add-data">
                        <i class="fa-solid fa-envelope-open" style="color: #63E6BE;"></i>
                    </div>
                </div>
            </div>
        `
        container.appendChild(div)
        div.querySelector('.add-data').addEventListener('click', () => {
            addData(item.title, item.view_count);
        });
    })


}

let count = 0

const datasection = document.getElementById("dataSection")
const readCount = document.getElementById("readCount")
function addData(title, view_count) {
    count = count + 1
    readCount.innerHTML = count

    const div = document.createElement("div")
    div.classList = "flex justify-between bg-[#f3f3f5]"
    div.innerHTML = ` 
        <h1 class="bg-[#f3f3f5] text-lg md:text-xl">
            ${title}
        </h1>
        <div class="icon bg-[#f3f3f5] ml-10 text-lg md:text-xl">
            <i class="fa-regular fa-eye"></i>
            <span class="mb-1 bg-[#f3f3f5]">${view_count}</span>
        </div>
        `
    datasection.appendChild(div)
}


// Latest Posts data fetching

const latestPosts = async () => {
    const data = await fetch(" https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const res = await data.json();
    latestData(res)
}

const latestData = (data) => {
    const PostBottom = document.querySelector(".PostBottom")
    data.map((item) => {
        // console.log(item);
        const div = document.createElement("div");
        div.classList = "card w-80 md:w-96 shadow-xl text-black"
        div.innerHTML = `
                    <figure class="px-10 pt-10">
                    <img src="${item.cover_image}" alt="Shoes"
                        class="rounded-xl" />
                </figure>
                <div class="card-body">
                    <div class="date px-3 md:px-0"><i class="fa-regular fa-calendar"></i> ${item?.author?.posted_date ?  item?.author?.posted_date : "No publish date"}</div>
                    <h2 class="card-title px-3 md:px-0">
                       ${item.title}
                    </h2>
                    <p class="mt-2 px-3 md:px-0">
                        ${item.description}
                    </p>
                    <div class="profile flex  gap-5 mt-2 px-3 md:px-0">
                        <div class="img w-10 h-10 rounded-full">
                            <img src="${item.cover_image}"
                                alt="Avatar" class="w-full h-full object-cover rounded-full" />
                        </div>
                        <div class="profile-info flex flex-col">
                            <div class="name font-bold">${item.author.name }</div>
                            <div class="auther">${item.author.designation ? item.author.designation : "Unknown"}</div>
                        </div>
                    </div>
                </div>
            `
            PostBottom.appendChild(div)
    })

}


// fetching data by search 
function searchBar() {
    const inputfild = document.getElementById("input")
    const searchbtn = document.getElementById("searchbtn")

    searchbtn.addEventListener("click", () => {
        fetchData(inputfild.value)
        inputfild.value = ''; 
    })
}
searchBar()
latestPosts()
fetchData()