# AI Voice

AI Voice is a modular AI-powered voice synthesis system that uses state-of-the-art models for text-to-speech (TTS), voice cloning, and voice conversion. It’s built for inference and fine-tuning workflows with scalable deployment in mind.

The backend uses deep learning models like Make-An-Audio, StyleTTS2, and seed-vc. These models are fine-tuned on custom datasets using AWS EC2 GPU instances and integrated into a Dockerized architecture. The frontend is built with Next.js and styled using Tailwind CSS.

---

## 🔧 Techniques and Implementation Highlights

* **[AWS EC2 G5 Instances](https://aws.amazon.com/ec2/instance-types/g5/)** – Used for GPU-based fine-tuning of TTS and VC models.
* **[AWS S3](https://aws.amazon.com/s3/)** – Stores trained model weights and generated audio for reuse and serving.
* **[AWS ECR](https://aws.amazon.com/ecr/)** – Hosts Docker container images to streamline deployment across EC2 nodes.
* **[Docker Compose](https://docs.docker.com/compose/)** – Manages the multi-container environment, separating frontend, backend, and inference tasks.
* **[Next.js](https://nextjs.org/)** – Framework for building the frontend UI with server-side rendering and API routes.
* **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS for responsive, fast-loading UI.

---

## 🧐 Models and AI Components

### [`Make-An-Audio`](https://github.com/yc640/MusicGen/tree/main/Make-An-Audio)

A diffusion-based text-to-audio generation model designed for high-quality and fast sampling. In this project, it is used to synthesize expressive audio from text or prompt-based inputs. The implementation is based on **ProDiff**, which reduces the sampling steps drastically (down to 2 steps) while maintaining quality by using knowledge distillation and direct data prediction instead of gradient-based estimation. This enables real-time or faster-than-real-time generation on modern GPUs.

### [`StyleTTS2`](https://github.com/yl4579/StyleTTS2)

A state-of-the-art text-to-speech model that leverages **style diffusion** and **adversarial training** with large speech language models like **WavLM**. It models speaking styles as latent variables via diffusion, enabling highly expressive and realistic synthesis without requiring reference audio. In benchmarks, StyleTTS2 surpasses human recordings on LJSpeech and achieves human-level quality on multispeaker datasets like VCTK. It's also capable of zero-shot speaker adaptation.

### [`seed-vc`](https://github.com/voicetech-team/seed-vc)

A diffusion-based zero-shot voice conversion model that transforms the timbre of one voice into another without requiring seen speaker data. It introduces a **timbre shifter** during training to reduce leakage and uses a **diffusion transformer** for in-context learning of reference timbre features. This design outperforms baselines like OpenVoice in speaker similarity and word accuracy, and also supports zero-shot singing voice conversion through F0 conditioning.

All three models are fine-tuned on AWS EC2 (g5.xlarge), with model weights and audio outputs stored in S3. Dockerized inference setups are pulled from AWS ECR for fast deployment.

---

## 📚 Non-obvious Tools and Services

* **AWS Ecosystem**:

  * [Amazon S3](https://aws.amazon.com/s3/) – Cloud storage for weights/audio.
  * [EC2 G5 Instances](https://aws.amazon.com/ec2/instance-types/g5/) – GPU-based training and inference.
  * [Elastic Container Registry (ECR)](https://aws.amazon.com/ecr/) – Docker image registry for deployment artifacts.

* **Frontend Fonts**:

  * [Inter Font](https://fonts.google.com/specimen/Inter) – Clean, readable UI font integrated via Google Fonts.

* **Infrastructure**:

  * Docker + AWS ECR combo enables reproducible, fast deployment across cloud instances.

---

## 📁 Project Structure

```bash
AI-Voice/
├── .vscode/
├── Make-An-Audio/
├── StyleTTS2/
├── StyleTTS2FineTune/
├── ai_voice_frontend/
├── seed-vc/
├── docker-compose.yml
├── .gitmodules
```

### Key Directories

* [`Make-An-Audio/`](./Make-An-Audio): Diffusion-based text-to-audio model with fast sampling.
* [`StyleTTS2/`](./StyleTTS2): Diffusion-based TTS with adversarial training and zero-shot style synthesis.
* [`StyleTTS2FineTune/`](./StyleTTS2FineTune): Scripts and configuration for fine-tuning StyleTTS2.
* [`seed-vc/`](./seed-vc): Diffusion transformer voice conversion model for speaker identity transformation.
* [`ai_voice_frontend/`](./ai_voice_frontend): Next.js frontend styled with Tailwind CSS.
* `.vscode/`: Developer config.
* `docker-compose.yml`: Defines and manages container orchestration.
