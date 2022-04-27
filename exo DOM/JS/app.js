let list = document.querySelector('ul');
let listElements = list.querySelectorAll('li');// on séléctionne dans la varaible list qui contient UL tout les li 


console.log('la liste ', list);
console.log('les éléments',listElements);

listElements.forEach(function(element){// on crée une boucle foreach avec une fonction qui prend en argument un élément 

    element.style.color ='red';    // on lui attributs un propriété color red en css 
    console.dir(element);    // .dir permet de consulté les porpriétés de l'élement et de celle qui lui son attribués 


});

// fonction de mélange
function shuffleChildren(parent){ // on crée un fonction qui appelle en parametre le variable parent 
    let children = parent.children; // on appelle les enfants du parent 
    let i = children.length, k , temp  // i vaut longeur de des enfant de la div board avec , varaible k , variable temp
    while(--i > 0 ){ // on boucle tant que 1 est oté de i est toujours positifs 
        k = Math.floor(Math.random() * (i+1))   // k stocke un nombre aléatoire basé sur i pour mélanger les boites 
        temp = children[k] // temp donne temporairmenr l'élément a la posittion k par l'élément a la position i 
        children[k] = children[i] // remplace l'élément à la position 
        parent.appendChild(temp)
    }
}
// function  de réaction des boits 
function showReaction(type,clickedBox){ // fonction prend pour variable type et clicked box 
    clickedBox.classList.add(type)      // ajout de la class type a clicked box 
    if(type !== "succes"){              // si type n'est pas strictement égal a "succes"
        setTimeout(function(){      // La fonction setTimeout est une fonction JavaScript native. Il définit une minuterie (un compte à rebours défini en millisecondes) pour l'exécution d'une fonction de rappel, appelant la fonction à la fin de la minuterie . La méthode setTimeout de JavaScript peut s'avérer utile dans diverses situations.    
            clickedBox.classList.remove(type) // on enleve la class type a cliked box et on défini une minutire de 800 milliseconde d'action de retardement 
        } , 800)
    }
}


function showTime(timeStarting, timeEnding){
    let difference = timeEnding - timeStarting
    let lapse = new Date(difference)

    let minutesLapse = lapse.getMinutes()
    let secondsLapse = lapse.getSeconds()
    let milisecLapse = lapse.getMilliseconds()

    minutesLapse = minutesLapse < 10 ? "0" + minutesLapse : minutesLapse
    secondsLapse = secondsLapse < 10 ? "0" + secondsLapse : secondsLapse

    if (milisecLapse < 10) {
        milisecLapse = "00" + milisecLapse
    } else if (milisecLapse < 100){
        milisecLapse = "0" + milisecLapse
    }

    document.getElementById("timer").innerHTML = "Vous avez mis  → " + minutesLapse + " : " + secondsLapse + " : " + milisecLapse
}



const box =document.createElement('div');//  on crée un élément div nommée box
box.classList.add('box');// on lui attribut un class nommée box
const board = document.querySelector('#board');// on donne a board la valeur de la id ="board"







let nb = 1 ;
let nombre = prompt("donner le nombre de boite voulue pour le jeu :",)

//  on crée une boucle pour crée 10 div box avec pour valeur 1 a 10 
for (let i = 1; i <=nombre; i++)
{
    const newBox = box.cloneNode(); // une copie, un clone de celui-ci grâce à la méthode cloneNode(). si nous n'avions pas procédé à une copie de l'élément box, nous aurions à chaque tour de boucle modifié et déplacé LE MEME ELEMENT !!! 
    newBox.innerText = i ;// on donne a la class box du text qui vaut 1 
    board.appendChild(newBox);// Nous allons le placer en enfant de la div#board en utilisant la méthode appendChild() de l'objet document : || appendChild() est une méthode qui place un élément du DOM à la fin du contenu de l'élément visé.  Pour ajouter du contenu au début, on utilisera la méthode prepend().
    
    newBox.addEventListener("click",function(){ // evenement click 
        newBox.classList.add('box-valid');

        if( i == nb)
        { //  si i strictement égal a 1 la boite a valide prend + 1  
            shuffleChildren(board);
            newBox.classList.add('box-valid');
          

            if(nb == board.children.length){    // 1 : Si nb est égal au nombre de boites du jeu, c'est que le dernier clic était sur la dernière boite → victoire du joueur ! (Il ne faut pas incrémenter nb avant !) // si nb  == longeur des enfant de la div board c-a-d 10
                board.querySelectorAll('.box').forEach(function(box){
                    showReaction('success',box); // pour board on selectionne toute les boites qui on  .box en css assigné et on appelle la function showReaction
                    let timeEnd = new Date();
                    showTime(timeStart, timeEnd);   

                })
                    const replays = document.createElement('button');
                    replays.setAttribute('id','replays');
                    replays.innerHTML ='rejouer';
                    document.body.appendChild(replays);
                    replays.onclick = () => document.location.reload();
            }

            shuffleChildren(board)
            nb++ 
        }
        else if (i > nb){                       // 2 : Si le numéro de la boite est supérieur à nb, c'est que le joueur a cliqué une boite trop élevée → game over ! On remet nb à 1, le jeu redémarre.
            showReaction('error', newBox) //  on cible le css nommé error
            nb = 1 ;

            board.querySelectorAll(".box-valid").forEach(function(validBox)
            {  //  pour board on selectionne tout les boites validé avec le foreach avec pour function valide box qui va remove annuller la boite validé 
                validBox.classList.remove("box-valid") 
                shuffleChildren(board)
            })
        }
        else
        {                                   // 3 : Dernière possibilité : le joueur a cliqué sur une boite déjà grisée. On l'informe simplement de cela, le jeu ne redémarre pas.
            showReaction('notice',newBox)
            shuffleChildren(board)

        }
    })
}
let timeStart = new Date()
shuffleChildren(board);


















