class Dep {
    constructor (subs = []) {
        this.subs = subs; 
    }

    add (sub) {
        this.subs.push(sub);
    }

    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}


export default Dep;