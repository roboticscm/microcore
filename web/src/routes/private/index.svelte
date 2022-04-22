<script context="module">
	export const load = async ({ fetch, session, url }) => {
		const res = await fetch(`${import.meta.env.VITE_API_PREFIX}auth/need-admin-login`, {
			method: 'POST',
			body: JSON.stringify({
				pathname: url.pathname,
				session
			})
		});

		if (res.status > 300) {
			return (await res.json()).error
		}

		return {
			props: {}
		};
	};
</script>

<script>
    import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
    import { LoginInfo } from '$src/store/login-info';
    
    onMount(() => {
        goto('/private/dashboard');
        LoginInfo.username$.next(localStorage.getItem('username') || '');
        LoginInfo.displayName$.next(localStorage.getItem('displayName') || '');
    })
</script>