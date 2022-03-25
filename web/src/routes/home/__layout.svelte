<script>
    import '../../../static/style/index.scss';
	import '../../init';
    import Nav from '/src/components/nav/index.svelte'

</script>

<main class="main w-100 h-100">
    <section class="main__nav">
        <div class="main__nav__content h-100">
            <Nav></Nav>
        </div>
        
    </section>
    
    <section class="main__content">
        <slot></slot>
    </section>
</main>
