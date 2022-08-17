document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)

// Update Function -------------------------------------------------
async function updateEntry(){
    try{
        const res = await fetch('update', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'}, 
            body: JSON.stringify({
                animalName: document.getElementsByName('animalName')[0].value,
                type:document.getElementsByName('type')[0].value,
                scientificName: document.getElementsByName('scientificName')[0].value,
                appearance: document.getElementsByName('appearance')[0].value,
                diet: document.getElementsByName('diet')[0].value,
                breeding: document.getElementsByName('breeding')[0].value,
                behavior: document.getElementsByName('behavior')[0].value,
                habitat: document.getElementsByName('habitat')[0].value,
                fieldNotes: document.getElementsByName('fieldNotes')[0].value,
                populationThreat: document.getElementsByName('populationThreat')[0].value,
                interestingfacts: document.getElementsByName('interestingFacts')[0].value,
                image:document.getElementsByName('image')[0].value
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//------------------------------------------------------------------


//Delete Function ---------------------------------------------------

async function deleteEntry(){
    const input = document.getElementById('deleteInput')
        try{
            const res = await fetch('delete', {
                method: 'delete',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    animalName: input.value
                })
            })
            const data = await res.json()
            location.reload()
        }catch(err){
            console.log(err)
        }
   }
   