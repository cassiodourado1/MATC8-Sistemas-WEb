window.onload = function () {
    initialize();
    pegaTodosFornecedLatlg();
};


function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        var endereco_completo = conteudo.logradouro + ", " + conteudo.bairro + ", " + conteudo.localidade + " - " + conteudo.uf;
        carregarNoMapa(endereco_completo);
        pegaTodosFornecedLatlg();
    } else {
        alert("CEP inválido.");
    }
}

//parametros: valor do cep, arquivo de onde vem a requisição
function buscarcep(valor) { //gambiarra
    var cep = valor.replace(/\D/g, '');
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            var script = document.createElement('script');
            script.src = '//viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        } else {
            alert("Formato de CEP inválido.");
        }
    }
    window.scrollTo(0, document.body.scrollHeight);
}

function callbackLikesFB(content) {
    var divLikes = document.createElement("div");
    divLikes.setAttribute("id", "likesFb");

    document.body.appendChild(divLikes);

    var likesfb = document.getElementById("likesFb");

    likesfb.value = content.fan_count;
    likesfb.innerHTML = content.fan_count;
    likesfb.style.display = "none";
}


document.addEventListener("DOMContentLoaded", function () {
    var script = document.createElement('script');
    var acess_token = "EAACEdEose0cBACuNb9XpZCwe4bCdckk5grpncDL6ZAzBKTov4FW2PZB1CZBD4RWZCXZByRsAZCywkCBOb4Gagon5r86VWTlAK19ZBjVwSRrZBny2ZBZAmMZBtrpHxtHLvj2fFmSLegexCM8ZAMU8qIiUbmwKI5c1nIDjybINlARk0CoBlosFRZAvuc8aWB5tyujMuAi8QM1HyPbcs8cAZDZD";
    script.src = "https://graph.facebook.com/v2.10/1737081642972696?fields=name,fan_count&access_token=" + acess_token + "&callback=callbackLikesFB";
    document.body.appendChild(script);
});
