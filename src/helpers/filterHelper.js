export const filterHelper = (arr, key, data, znack = null) => {

    if(arr.length){

        return arr.filter(el => {

            if(znack){

                if(znack === '>') return el[key] > +data

                else return el[key] < +data

            } else {

                return el[key] === data

            }

        })

    }

    return []

}