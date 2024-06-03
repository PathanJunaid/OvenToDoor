export const DateTime = (DateArg)=>{
    console.log(DateArg)
    const isoString = typeof DateArg === 'string' ? DateArg : DateArg.toString();
    console.log(isoString)
    // Create a Date object from the ISO string
    const date = new Date(isoString);
    // console.log(date)
    
    // Convert to Indian Standard Time (IST)
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    //   fractionalSecondDigits: 3,
      hour12: false
    };
    const formattedDateTime = date.toLocaleString('en-GB', options);
    
    // Split the formatted string into date and time
    const [formattedDate, formattedTime] = formattedDateTime.split(', ');
    return {formattedDate, formattedTime}
}