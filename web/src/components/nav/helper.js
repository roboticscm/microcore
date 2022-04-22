export const menuList = [
    { id: '0', code: 'private',  page: "views", icon: '<i class="fas fa-user-lock"></i>', name: 'sys.menu.admin page', path: '/private/dashboard' },
    { code: 'separator', page: "views" },
    { id: '1', code: 'dashboard',  page: "views", icon: '<i class="fas fa-chart-bar"></i>', name: 'sys.menu.dashboard', path: '/views/dashboard' },
    { id: '2', code: 'profile',  page: "views", icon: '<i class="fas fa-user-circle"></i>', name:  'sys.menu.profile', path: '/views/profile' },
    { id: '3', code: 'tradingPackage',  page: "views", icon: '<i class="fa-solid fa-box-open"></i>', name:  'sys.menu.trading package', path: '/views/trading-package' },
    { id: '4', code: 'wallet',  page: "views", icon: '<i class="fa-solid fa-wallet"></i>', name:  'sys.menu.wallet', path: '/views/wallet' },
    { id: '5', code: 'referrals',  page: "views", icon: '<i class="fas fa-users"></i>', name:  'sys.menu.referrals', path: '/views/referrals' },
    { id: '6', code: 'tradingProof',  page: "views", icon: '<i class="fa-solid fa-clock-rotate-left"></i>', name:  'sys.menu.trading proof', path: '/views/trading-proof' },
    { code: 'separator',  page: "views" },
    { id: '7', code: 'blogs',  page: "views", icon: '<i class="fas fa-blog"></i>', name:  'sys.menu.blogs', path: '/views/blogs' },
    { id: '8', code: 'about',  page: "views", icon: '<i class="fa-solid fa-user-astronaut"></i>', name:  'sys.menu.about', path: '/views/about' },
    
    { code: 'separator', page: "private" },
    { id: '11', code: 'public',  page: "private", icon: '<i class="fas fa-globe-americas"></i>', name: 'sys.menu.public page', path: '/views/dashboard' },

    { code: 'separator', page: "private" },
    { id: '12', code: 'dashboard',  page: "private", icon: '<i class="fas fa-chart-bar"></i>', name: 'sys.menu.dashboard', path: '/private/dashboard' },
    { id: '13', code: 'investment',  page: "private", icon: '<i class="fas fa-piggy-bank"></i>', name: 'sys.menu.investment', path: '/private/investment' },
    { id: '14', code: 'revenueSharing',  page: "private", icon: '<i class="fas fa-comment-dollar"></i>', name: 'sys.menu.revenue sharing', path: '/private/revenue-sharing' },
    { id: '15', code: 'payout',  page: "private", icon: '<i class="fas fa-money-check-alt"></i>', name: 'sys.menu.payout', path: '/private/payout' },
    { id: '16', code: 'config',  page: "private", icon: '<i class="fa fa-gear"></i>', name: 'sys.menu.config', path: '/private/config' },

    { code: 'separator',  page: "all" },
    { id: '9', code: 'logout',  page: "all", icon: '<i class="fa fa-sign-out"></i>', name:  'sys.menu.logout', path: '../../' },
];

export const getMenu = (menuId) => {
    return menuList.find(it => it.id == menuId)
}