const app = Vue.createApp({
    data() {
        return {
            title: "contador App - Vue",
            count: 0,
        };
    },
    methods: {
        modcount(instruction = "add", limit = 1){
            if(instruction === 'dis')
                this.count -= limit;
            else
                this.count += limit;
        },
    }
});