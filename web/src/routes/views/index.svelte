<script context="module">
    export const load = () => {
        return {
            props: {
                
            }
        }
    }
</script>
<script>
    import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

    onMount(() => {
        goto('/views/dashboard');
    })
</script>
