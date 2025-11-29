(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/providers/privy-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrivyClientProvider",
    ()=>PrivyClientProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$react$2d$auth$40$3$2e$8$2e$0_1353313bcee65ad9f3eadfc157aac9d7$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$CI666IP9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__PrivyProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@privy-io+react-auth@3.8.0_1353313bcee65ad9f3eadfc157aac9d7/node_modules/@privy-io/react-auth/dist/esm/index-CI666IP9.mjs [app-client] (ecmascript) <export G as PrivyProvider>");
"use client";
;
;
function PrivyClientProvider({ children }) {
    const appId = ("TURBOPACK compile-time value", "cmie1ss1f03pykz0ctao60id7");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$privy$2d$io$2b$react$2d$auth$40$3$2e$8$2e$0_1353313bcee65ad9f3eadfc157aac9d7$2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$CI666IP9$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__PrivyProvider$3e$__["PrivyProvider"], {
        appId: appId,
        config: {
            // Display settings
            appearance: {
                theme: "dark",
                accentColor: "#00E5BE",
                logo: "/trendzap-logo.svg",
                showWalletLoginFirst: false
            },
            // Login methods
            loginMethods: [
                "email",
                "wallet",
                "google",
                "twitter"
            ],
            // Embedded wallets for non-crypto users
            embeddedWallets: {
                createOnLogin: "users-without-wallets"
            },
            // External wallets to support
            externalWallets: {
                coinbaseWallet: {
                    connectionOptions: "smartWalletOnly"
                }
            },
            // Removed: solanaRpcServers, solanaCluster, and Solana from supportedChains
            // Default chain (Base for USDC)
            defaultChain: {
                id: 8453,
                name: "Base",
                network: "base",
                nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18
                },
                rpcUrls: {
                    default: {
                        http: [
                            "https://mainnet.base.org"
                        ]
                    },
                    public: {
                        http: [
                            "https://mainnet.base.org"
                        ]
                    }
                },
                blockExplorers: {
                    default: {
                        name: "BaseScan",
                        url: "https://basescan.org"
                    }
                }
            },
            // EVM chains only (Base and Arbitrum)
            supportedChains: [
                {
                    id: 8453,
                    name: "Base",
                    network: "base",
                    nativeCurrency: {
                        name: "Ethereum",
                        symbol: "ETH",
                        decimals: 18
                    },
                    rpcUrls: {
                        default: {
                            http: [
                                "https://mainnet.base.org"
                            ]
                        },
                        public: {
                            http: [
                                "https://mainnet.base.org"
                            ]
                        }
                    },
                    blockExplorers: {
                        default: {
                            name: "BaseScan",
                            url: "https://basescan.org"
                        }
                    }
                },
                {
                    id: 42161,
                    name: "Arbitrum One",
                    network: "arbitrum",
                    nativeCurrency: {
                        name: "Ethereum",
                        symbol: "ETH",
                        decimals: 18
                    },
                    rpcUrls: {
                        default: {
                            http: [
                                "https://arb1.arbitrum.io/rpc"
                            ]
                        },
                        public: {
                            http: [
                                "https://arb1.arbitrum.io/rpc"
                            ]
                        }
                    },
                    blockExplorers: {
                        default: {
                            name: "Arbiscan",
                            url: "https://arbiscan.io"
                        }
                    }
                }
            ]
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/providers/privy-provider.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = PrivyClientProvider;
var _c;
__turbopack_context__.k.register(_c, "PrivyClientProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_providers_privy-provider_tsx_5f773592._.js.map