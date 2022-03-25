<script context="module">
	import { loadResource } from '$lib/i18n';

	export const load = async ({ fetch }) => {
		const resourcePromise = loadResource(fetch);
		await Promise.all([resourcePromise]);
		return {
			status: 200,
			props: {
				loaded: true
			}
		};
	};
</script>

<script>
    import '../../../static/style/index.scss';
	import '../../init';
    import Nav from '/src/components/nav/index.svelte'
    import { onMount } from 'svelte';
    import { config } from '/src/config/server';
	import { AppStore } from '/src/store/app';
	import JsonParseBigInt from 'json-parse-bigint';
	import { Browser } from '$lib/browser';
	import { locale } from '$lib/i18n';

    const { notify$ } = AppStore;

    onMount(() => {
        const defaultLocale = Browser.getLocale();
		AppStore.locale$.next(defaultLocale);
		$locale = defaultLocale;
		const evtSource = new EventSource(`${config.messagingServer}/notify`);
		evtSource.onmessage = (event) => {
			notify$.next(JsonParseBigInt(event.data));
		};
    })

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
