const vm = new Vue({

    el: "#app",

    data: {


        mensagem: "Vue carregado! 2021",
        produtos: [],
        produto: false

    },

    methods: {
        fecthProdutos() {

            fetch("./api/produtos.json")
                .then(r => r.json())
                .then(r => {

                    this.produtos = r;
                })

        },

        fetchProduto(id) {

            fetch(`api/produtos/${id}/dados.json`)
                .then(r => r.json())
                .then(r => {

                    this.produto = r;
                })

        }


    },

    created() {

        this.fecthProdutos();
    }
})