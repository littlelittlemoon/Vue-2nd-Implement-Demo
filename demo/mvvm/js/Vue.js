import Dep from './Dep.js';
import Watcher from './Watcher.js';

class Vue {
    /**
     * Vue constructor
     * @param {Object} options 
     * @param {String} options.el
     * @param {Object} options.data
     */
    constructor(options) {
        this.el = options.el;
        this.data = options.data;

        this.observe(this.data, this);
        let vDom = this.vNodeContainer(document.getElementById(this.el), this);
        document.getElementById(this.el).appendChild(vDom);  
    }

    vNodeContainer (node, vm, flag) {
        flag = flag || document.createDocumentFragment();
      
        let child;
        while (child = node.firstChild) {
            this.compile(child, vm);
            flag.appendChild(child);
            if (child.firstChild) {
                // flag.appendChild(vNodeContainer(child, vm));
                this.vNodeContainer(child, vm, flag);
            }
        }
        return flag;
    }

    compile (node, vm) {
        const reg = /\{\{(.*)\}\}/g; 
        
        // 一个元素节点, 如: <div>
        if (node.nodeType === 1) { 
            let attr = node.attributes;
            // 解析节点的属性
            for (let i = 0; i < attr.length; i++) {
                if (attr[i].nodeName == 'v-model') {
                    let name = attr[i].nodeValue;
                    new Watcher(vm, node, name) 

                    node.addEventListener('input', (e) => {
                        console.log('vm[name]', vm[name]);
                        vm[name] = e.target.value;
                    });

                    node.value = vm.data[name];
                    node.removeAttribute('v-model');
                }
            }
        }
        // 如果节点类型为 text, 如: {{}}
        if (node.nodeType === 3){
            if (reg.test(node.nodeValue)){
                let name = RegExp.$1; 
                name = name.trim();
                new Watcher(vm, node, name);
                node.nodeValue = vm.data[name];
            }
        }
    }

    defineReactive (obj, key, value) {
        let dep = new Dep();

        Object.defineProperty(obj, key, {
            get: () => {
                if (Dep.global) { 
                    dep.add(Dep.global);
                }
                return value;
            },
            set: (newValue) => {
                if (newValue === value) {
                    return;
                }
                value = newValue; 
                dep.notify();
            }
        })
    }

    observe (obj, vm) {
        Object.keys(obj).forEach((key) => {
            this.defineReactive(vm, key, obj[key]);
        })
    }
}

export default Vue;