const darkMode = document.getElementById("button_darkMode");
const chart = document.getElementById("#chart")



darkMode.addEventListener("click", () =>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        chart.updateOptions({
            xaxi:{
                labels:{
                    style:{
                        colors:'#fff'
                    }
                }
            },
                yaxis:{
                    labels:{
                        style:{
                            colors:'#fff'
                        }
                    }
                    
                },
                tooltip:{
                    theme:'dark',
                    style:{
                        color:'#fff'
                    }

                },
                legend:{
                    labels:{
                        colors:'#fff'
                    }
                },
            
        })
    }
})
