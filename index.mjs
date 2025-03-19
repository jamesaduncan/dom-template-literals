class TemplateEngine {

    evaluate( expr, context ) {
        const code = "'use strict'; `"+expr+"`";
        try {
            return eval?.apply( context, [ code ] );
        } catch (e) {
            return '';
        }
    }

    render( node, context ) {
        const treeWalker = document.createTreeWalker( node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT );
        "use strict";
        while( treeWalker.nextNode() ) {
            const node = treeWalker.currentNode;
            if ( node.nodeType === 3) {
                node.textContent = this.evaluate( node.textContent );    
            } else {
                for ( const attr of node.attributes ) {
                    attr.value = this.evaluate( attr.value, context );
                }
            }
        }
    }
}



document.addEventListener("DOMContentLoaded", () => {
    const engine = new TemplateEngine();
    engine.render( document.body, {} );
});

export default TemplateEngine;