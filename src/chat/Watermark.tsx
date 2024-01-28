


const Watermark = () =>
{
    return (
        <div className="w-28 h-28 flex flex-col items-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src="https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/327465130_726711092417365_8334114910654247301_n.png?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=JPLiRb_8kjEAX-6xxlw&_nc_ht=scontent-cph2-1.xx&oh=00_AfBHm-osYYheL2lA9b6uXCes5EiYkHYtqjMCY7j4dgjiWg&oe=65B8BC93" alt="Watermark Icon" className="rounded-full w-24 h-24"></img>
            <div className="mt-2 text-2xl font-semibold whitespace-nowrap">Vad behöver du hjälp med?</div>
        </div>
    )
}

export default Watermark