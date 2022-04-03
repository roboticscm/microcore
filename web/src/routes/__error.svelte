<script>
    import '../../static/style/index.scss';
    import '../init';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
 </script>
 <div class="w-100 h-100 center-box" style="background: var(--base-background);">
    <div>
        <div style="font-size: 8rem;">404</div>
        <div style="font-size: 2rem;">Page not found</div>
        <div class="center-text" style="cursor: pointer;" on:click={() => {dispatch('changeMode', { mode: 'LOGIN' }); location.href='/';}}>
            <i class="extreme-font-size fas fa-home"></i>
        </div>
    </div>
 </div>
 