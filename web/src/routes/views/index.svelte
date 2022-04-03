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
    import { LoginInfo } from '/src/store/login-info';
    
    onMount(() => {
        goto('/views/dashboard');
        LoginInfo.username$.next(localStorage.getItem('username') || '');
        LoginInfo.displayName$.next(localStorage.getItem('displayName') || '');
    })
</script>
