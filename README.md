# ModelHarbor Pocket v0.2

An **iPhone-only, browser-based local AI workbench**. No computer, Docker server, paid AI key, Apple developer account or App Store distribution is required to use the project *once published*. This is a source-code starter, **not a hosted app URL or a native iOS `.ipa`**.

The app uses [MLC WebLLM](https://github.com/mlc-ai/web-llm) and WebGPU to run selected small language models in Safari. It is **not** the same as a free 24/7 AI hosting service: iOS suspends browser apps in the background, the iPhone cannot act as a reliable public model API, local model sizes are limited by hardware, and model downloads need storage and internet access.

## Set it up using only your iPhone

1. **Download the `ModelHarbor_Pocket_iPhone.zip`** file from this ChatGPT conversation onto the iPhone, using Safari or the Files app. In Files, tap the ZIP to unzip it.
2. Sign in at **[github.com](https://github.com)** in **Safari on the iPhone** (create a free account if necessary). Choose **New repository**, name it `modelharbor-pocket`, and make it **Public**. GitHub Pages' free hosting is generally available for public repositories; service terms and availability can change. **Do not upload your exported private chat backups to this repository.**
3. In your new repository, choose **Add file → Upload files**. Upload these files **directly into the root of the repository**: `index.html`, `sw.js`, `manifest.webmanifest`, `icon.svg`, and `apple-touch-icon.png`. GitHub mobile layout can hide controls; use Safari's **Request Desktop Website** if needed. Commit the upload. (You can also upload this README.) **Do not upload the ZIP file by itself**: Pages cannot extract it.
4. In repository **Settings → Pages**, select **Deploy from a branch**, branch **main** and folder **/(root)**, then Save. Wait for GitHub to show the site's published link.
5. Open `https://YOUR_GITHUB_USERNAME.github.io/modelharbor-pocket/` **in Safari**, replacing `YOUR_GITHUB_USERNAME`. The site is hosted on GitHub Pages, but AI inference runs **on your iPhone**. Tap Safari's Share button → **Add to Home Screen** → Add.
6. In ModelHarbor Pocket, open **Settings** and confirm the GPU adapter is available. Return to **Chat**, select **SmolLM2 360M · iPhone starter**, and tap **Download & start model**. Keep Safari open and the iPhone awake while the model downloads. Prefer Wi-Fi and a charging cable. Once it says **Local AI ready**, type a message.

**If Safari restarts, freezes or the app says there is not enough memory:** close other Safari tabs, reload the app, select the starter model, and avoid long conversation histories. On older or lower-memory iPhones, even the small model may fail. This is a hardware/browser limitation; no successful inference was verified on your physical iPhone.

## Included features

- On-device, streaming text chat using local WebGPU (with no paid inference API).
- Four small WebLLM model presets; default is SmolLM2 360M q4f32_1 (approximately 580 MB estimated *VRAM*, **not** 580 MB model download size). Other choices may require `shader-f16` and additional RAM.
- Custom assistants with editable system prompts, creativity and max-output settings.
- Save version history, duplicate assistants, restore old assistant versions.
- Separate chat histories for each assistant, saved in the browser's local storage.
- Import/export a JSON backup using the iPhone Files app.
- Device compatibility checks, app shell service-worker caching, Home Screen web-app support.

## Important technical and privacy limits

- **You are not creating or fine-tuning model weights.** Custom assistants in Studio are different *prompts and parameters* applied to an existing model. Importing arbitrary GGUF files, training weights, running custom GPU kernels and deploying a public inference API are not implemented here.
- **A secure origin is required.** Opening `index.html` straight from Files (`file://`) will **not** run inference; WebGPU and service workers require the browser's appropriate secure context. Use HTTPS via GitHub Pages or another static web host.
- **Inference is on-device**. This starter does not contain code that sends chat messages to a remote API. However, it *does* fetch executable runtime JavaScript from `https://esm.run/@mlc-ai/web-llm` and model files from providers listed by WebLLM. You must trust those external providers and their supply chain. Self-host/pin and audit dependencies for high-security use.
- **First-run internet is required** to download the runtime and model weights. The model files are cached by WebLLM when possible and the service worker caches the app shell, but *fully offline reloading is not guaranteed* because external runtime imports and iOS cache eviction may require internet. **Offline inference after the runtime and weights have loaded can work** while the app is running.
- The app stores conversations and assistant settings in **Safari localStorage**, unencrypted. Anyone with access to an unlocked phone/browser profile could read them. Clearing Safari website data, private browsing or automatic browser cleanup may remove them; export backups regularly.
- **Hosting the static website doesn't make inference remote.** GitHub Pages hosts only public app files. Your private chats and model weights are not uploaded to the GitHub repository by this app.
- **No 24/7 server, public API, remote deployment or lifetime service guarantee.** iOS app suspension, power and storage limits apply. GitHub Pages and model repositories are third-party services and may change access rules or terms.
- **Model licences differ**. Before redistributing, selling or commercially deploying any model, inspect the model publisher's licence and conditions. “Free software” does not imply permission to trade or resell every model.
- This starter is not a medical, financial, or legal advice system. Small models can hallucinate substantially.

## Model references and implementation details

- WebLLM: <https://github.com/mlc-ai/web-llm>
- Built-in model IDs and memory estimates: <https://webllm.mlc.ai/models/>
- Safari 26/WebGPU announcement: <https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/>
- GitHub Pages publishing: <https://docs.github.com/en/pages/quickstart>

The runtime is loaded dynamically from the WebLLM CDN after you press Download & Start. WebLLM's `MLCEngine` then loads a model by its prebuilt identifier using its local WebGPU backend. The project is written in plain HTML, CSS, JavaScript, a web manifest and service worker, with no app backend.

## Testing status

Project static-file validation and JavaScript syntax checking were performed. A headless desktop-browser smoke test could not be completed in this environment. **We cannot run a physical iPhone GPU test or model download from this packaging environment.** A valid project does not mean your specific phone has enough GPU memory.
