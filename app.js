const vm = new Vue({

    el: "#app",

    data: {


        mensagem: "Vue carregado! 2021",
        produtos: [],
        carrinho: [],

        produto: false,
        produto: false,

    },
    filters: {

        numeroPreco(valor) {

            return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        }
    },

    computed: {


        carrinhoTotal() {

            let total = 0;

            if (this.carrinho.length) {

                this.carrinho.forEach(item => {
                    total += item.preco
                });
            }

            return total
        }
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

        },

        fecharModal({
            target,
            currentTarget
        }) {

            if (target === currentTarget) this.produto = false
        },

        adicionarItem() {

            this.produto.estoque--
                const { id, preco, nome } = this.produto
            this.carrinho.push({ id, preco, nome })

        },


        removerItem(index) {

            this.carrinho.splice(index, 1)
        },

        checarLocalStorage() {

            if (window.localStorage.carrinho)
                this.carrinho = JSON.parse(window.localStorage.carrinho)
        }


    },

    watch: {
        carrinho() {

            window.localStorage.carrinho = JSON.stringify(this.carrinho)
        }
    },

    created() {

        this.fecthProdutos()
        this.checarLocalStorage()
    }
})