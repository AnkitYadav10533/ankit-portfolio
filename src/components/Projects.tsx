"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText, X, Check, Award, Server } from "lucide-react";
import GlassCard from "./GlassCard";

interface Project {
  id: number;
  title: string;
  category: string;
  status: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  features: string[];
  architecture: string;
  flowchart: string[];
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Google Play Store Case Study",
    category: "Data Analytics",
    status: "Completed",
    description: "Exploratory Data Analysis (EDA) of the Google Play Store dataset to identify key market trends, application categories, and user rating patterns that drive app success.",
    image: "/assets/images/project1.png",
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2001%20-%20Google%20Play%20Store%20Case%20Study",
    features: [
      "Thorough data cleaning and preprocessing of millions of rows.",
      "Visual distribution analysis using Matplotlib & Seaborn.",
      "Correlation studies between download volume, app size, and average ratings."
    ],
    architecture: "Jupyter Notebook -> Pandas Data Cleaning -> Seaborn Visualizations",
    flowchart: [
      "Load raw CSV records",
      "Format reviews, installs, and sizes into numeric scales",
      "Drop duplicates and null parameters",
      "Plot category distributions and rating histograms",
      "Generate correlation matrix of installations vs features"
    ]
  },
  {
    id: 2,
    title: "Outlier Detection & Removal",
    category: "Data Science",
    status: "Completed",
    description: "Implementation of various statistics-based techniques to detect and eliminate outliers in continuous datasets, enhancing model accuracy and regression robustness.",
    image: "/assets/images/project2.png",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib", "Jupyter"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2002%20-%20Outlier%20Detection%20and%20Removal",
    features: [
      "Standard Deviation and Z-Score outlier removal filters.",
      "Interquartile Range (IQR) threshold boundary methods.",
      "Comparative visualizations of pre/post-cleaning distributions."
    ],
    architecture: "Continuous Inputs -> Z-Score Filter / IQR Boundary Analyzer -> Filtered Clean Output Dataset",
    flowchart: [
      "Load datasets containing extreme distributions",
      "Calculate Mean, Standard Deviation, and Quartiles",
      "Construct upper and lower bounds based on Z-Score or IQR scale factors",
      "Identify rows out of boundaries",
      "Remove outlier observations and plot filtered variables distributions"
    ]
  },
  {
    id: 3,
    title: "Linear Regression Deployment",
    category: "Machine Learning",
    status: "Completed",
    description: "Interactive Streamlit web-based deployment of a Linear Regression model for predicting target continuous variables using custom inputs in real-time.",
    image: "/assets/images/project3.png",
    tags: ["Python", "Streamlit", "Scikit-Learn", "Matplotlib"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2004%20-%20Linear%20Regression%20Deployment",
    liveUrl: "https://ankityadav10533-linear-regression-deployment--app-ejebfm.streamlit.app/",
    features: [
      "Fully interactive sliders for custom regression inputs.",
      "Real-time model inference and immediate outputs updates.",
      "Interactive visualization of the fitted regression line."
    ],
    architecture: "Client (Streamlit Web Interface) -> Scikit-Learn Linear Regression Model -> Live Prediction Display",
    flowchart: [
      "User configures variables using input slidebars",
      "Input vectors constructed in Python backend",
      "Linear regression model performs immediate prediction computation",
      "Fitted regression lines plotted on scatter plots",
      "Predicted value rendered as highlighted numeric badge"
    ]
  },
  {
    id: 4,
    title: "Logistic Regression Classifier",
    category: "Machine Learning",
    status: "Completed",
    description: "An interactive classification dashboard deploying a Logistic Regression model to predict binary outcomes based on user-provided inputs.",
    image: "/assets/images/project1.png",
    tags: ["Python", "Streamlit", "Scikit-Learn", "Classification"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2005%20-%20Logistic%20Regression",
    liveUrl: "https://srdt-internshipday3-hgpt92r89yxnsqkatuntzp.streamlit.app/",
    features: [
      "Interactive prediction threshold adjusting sliders.",
      "Probability distribution gauges and classification performance charts.",
      "Decision boundary indicators dynamically rendered on Streamlit panels."
    ],
    architecture: "User Parameters -> Sigmoid Probability Processor -> Logistic Classification Pipeline -> Live Dashboard Feedback",
    flowchart: [
      "User inputs variables and adjusts threshold scale",
      "Logistic regression model computes probability values",
      "Sigmoid boundary thresholds map target class (0 or 1)",
      "Classification results and dynamic matrices plotted",
      "Final class classification rendered in color-coded cards"
    ]
  },
  {
    id: 5,
    title: "Employee Retention Analysis",
    category: "HR Analytics",
    status: "Completed",
    description: "Predictive HR model engineered to forecast the probability of employee attrition using job satisfaction levels, evaluation scores, and work metrics.",
    image: "/assets/images/project2.png",
    tags: ["Python", "Streamlit", "Scikit-Learn", "HR Data"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2006%20-%20Employee%20Retention%20Analysis",
    liveUrl: "https://employeeretentionprediction-bpozw82yg9edgbgg9nghyl.streamlit.app/",
    features: [
      "Dynamic attrition probability gauges visualizer.",
      "Detailed breakdown of key features influencing employee turnover.",
      "Interactive dashboards designed for modern enterprise HR management."
    ],
    architecture: "HR Database Records -> Feature Scaling -> Classification Pipeline -> Attrition Risk Assessment Panel",
    flowchart: [
      "Select employee satisfaction, average monthly hours, and evaluation values",
      "Features scaled and fed into fitted classifier models",
      "Compute attrition probability percentages",
      "Identify major positive/negative turnover drivers",
      "Render visual attrition gauge indicator with risk alerts"
    ]
  },
  {
    id: 6,
    title: "Cat & Dog Image Classifier",
    category: "Computer Vision",
    status: "Completed",
    description: "Computer Vision application that uses a deep learning classifier to distinguish between uploaded images of cats and dogs using convolutional networks.",
    image: "/assets/images/project3.png",
    tags: ["Python", "Streamlit", "TensorFlow", "Keras", "CNN"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2007%20-%20Cat%20and%20Dog%20Image%20Classifier",
    liveUrl: "https://imageclassifiercat-vs-dog-lnraaac8xrwhamzoyxkbjb.streamlit.app/",
    features: [
      "Drag-and-drop local image uploading interface.",
      "Vibrant gauge layouts presenting inference probabilities.",
      "Deep learning pipeline leveraging custom convolutional networks (CNN)."
    ],
    architecture: "Image Upload -> Resize & Normalization Preprocessing -> TensorFlow CNN Core Model -> Category Inference",
    flowchart: [
      "User uploads JPG/PNG image",
      "Image resized to target dimension and normalized to standard tensor values",
      "Tensors fed into convolutional and max pooling layers of CNN",
      "Softmax classifier computes probability score of Cat vs Dog",
      "Render final class indicator and validation progress dials"
    ]
  },
  {
    id: 7,
    title: "K-Means Clustering Visualizer",
    category: "Machine Learning",
    status: "Completed",
    description: "Interactive Unsupervised Learning dashboard allowing users to perform and visualize K-Means clustering dynamically on continuous datasets.",
    image: "/assets/images/project1.png",
    tags: ["Python", "Streamlit", "Scikit-Learn", "Clustering"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2008%20-%20K-Means%20Clustering",
    liveUrl: "https://projectkmeanclustering-nev3i388oaoudk9vnm8da2.streamlit.app/",
    features: [
      "Adjustable sliders to specify cluster count (K) in real-time.",
      "Interactive 2D scatter plots mapping cluster segments and centroids.",
      "Elbow point visualizers mapping sum of squared errors (SSE) trends."
    ],
    architecture: "Dataset Vectors -> K-Means Clustering Core -> SSE Elbow Solver -> Interactive Scatter Renderers",
    flowchart: [
      "Select dataset attributes and slide K slider parameter",
      "Unsupervised K-Means fits cluster vectors",
      "Centroids coordinates resolved",
      "Compute cluster labels for data observations",
      "Update scatter plots with custom colors mapping cluster divisions"
    ]
  },
  {
    id: 8,
    title: "Gender Classification System",
    category: "Machine Learning",
    status: "Completed",
    description: "Classification dashboard leveraging machine learning algorithms to predict gender profiles based on custom physical metrics.",
    image: "/assets/images/project2.png",
    tags: ["Python", "Streamlit", "Scikit-Learn", "Classification"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2009%20-%20Gender%20Classification%20using%20Machine%20Learning",
    liveUrl: "https://genderclassification-dudjenrcphojawr4apbpvp.streamlit.app/",
    features: [
      "Multi-input sliders for height, weight, and key physical parameters.",
      "Instant classifier prediction feedback with clean visual tags.",
      "Comparative visualizer charts mapping input metrics to average stats."
    ],
    architecture: "Inputs Parameters -> Feature Preprocessors -> Scikit-Learn Classifier -> Classification Badge Output",
    flowchart: [
      "User sets height, weight, and body metrics on sliders",
      "Python pipeline shapes features input arrays",
      "Fitted machine learning models predict probability coefficients",
      "Map prediction outcome to final gender class label",
      "Render animated cards summarizing classification results"
    ]
  },
  {
    id: 9,
    title: "Binary Image Classifier",
    category: "Deep Learning",
    status: "Completed",
    description: "Deep Learning application built on convolutional layers to perform binary image categorization on customizable image classes.",
    image: "/assets/images/project3.png",
    tags: ["Python", "Streamlit", "TensorFlow", "Keras", "CNN"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2010%20-%20Binary%20Image%20Classifier%20using%20Deep%20Learning",
    liveUrl: "https://projectaimlgenerativeai-e3tqhbvr9jcxdl7nevzaiu.streamlit.app/",
    features: [
      "Dynamic model configuration supporting multi-class mappings.",
      "Local image drag-and-drop loading preprocessors.",
      "Performance metrics dashboards showing accuracy tracking."
    ],
    architecture: "Image File -> Conv2D Feature Extractor -> Dense Neural Network -> Categorical Result",
    flowchart: [
      "Upload image file",
      "Perform image resize transformations",
      "Pass array tensors into trained convolutional architectures",
      "Flatten vectors and compute scores inside dense layers",
      "Render final classifications outputs on screen"
    ]
  },
  {
    id: 10,
    title: "Covid-19 Detection System",
    category: "Medical CV",
    status: "Completed",
    description: "Medical imaging diagnostic application leveraging Deep Learning to classify chest X-ray images into COVID-19 positive or negative cases.",
    image: "/assets/images/project1.png",
    tags: ["Python", "Streamlit", "TensorFlow", "Keras", "Medical AI"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2011%20-%20Covid-19%20Detection%20System%20from%20Image",
    liveUrl: "https://day-6-covid-19-detection-system-nrevsautatvoabchctfdps.streamlit.app/",
    features: [
      "Real-time parsing and classification of medical chest X-ray scans.",
      "Vibrant confidence percentage indicators.",
      "Built-in health recommendations and medical guidelines overlay."
    ],
    architecture: "Chest X-Ray JPG -> Normalized Image Array -> TensorFlow Deep Neural Classifier -> COVID Risk Predictor",
    flowchart: [
      "Upload chest X-Ray scan image",
      "Convert to grayscale/RGB tensors and resize to target dimension",
      "Image normalized and parsed through neural layers",
      "Binary prediction output generated (COVID-19 Positive / Negative)",
      "Display results with warnings, accuracy ratings, and next step guidelines"
    ]
  },
  {
    id: 11,
    title: "Eye Gender Detection",
    category: "Computer Vision",
    status: "Completed",
    description: "High-accuracy Convolutional Neural Network (CNN) application designed to classify gender based on close-up crop images of human eyes.",
    image: "/assets/images/project2.png",
    tags: ["Python", "Streamlit", "TensorFlow", "Keras", "CNN"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2012%20-%20Eye%20Gender%20Detection%20using%20CNN",
    liveUrl: "https://malefemaleeyedetection-nuyp9efmrsppdpcctbyymj.streamlit.app/",
    features: [
      "Automated regions-of-interest eye ROI crop preprocessing.",
      "High accuracy classifications matching neural activation models.",
      "Streamlit model load optimization and performance caching."
    ],
    architecture: "Eye Image -> CNN Region Analyzer -> Binary Output Classifier -> Results Panel",
    flowchart: [
      "User uploads portrait/eye close-up photo",
      "Preprocess and crop targeted eye structures",
      "CNN filters scan iris and structure patterns",
      "Calculate gender probability matrices",
      "Display classification dials"
    ]
  },
  {
    id: 12,
    title: "Samsung RAG Chatbot",
    category: "Generative AI",
    status: "Completed",
    description: "Retrieval-Augmented Generation (RAG) chatbot that reads technical washing machine manuals to answer user operational queries precisely.",
    image: "/assets/images/project3.png",
    tags: ["Python", "Streamlit", "Gemini AI", "LangChain", "RAG"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2013%20-%20RAG_Based_ChatBot_of_Samsung_Washing_machine",
    liveUrl: "https://drdt-day-7-ragchatbot-v55ebcczwfrdkgdnrf4dsv.streamlit.app/",
    features: [
      "Dynamic manual indexing parsing technical PDF documentation.",
      "Vector embeddings search matching user questions to documentation extracts.",
      "Fully conversational message context loop with Google Gemini API."
    ],
    architecture: "PDF Document -> Text Splitter -> Vector Embeddings Database -> Gemini RAG Prompt Generator -> Chatbot UI",
    flowchart: [
      "Manual PDF text chunked and vectorized",
      "User queries operational problem",
      "Vector search finds relevant documentation instructions",
      "Query + extracted document instructions packed into Gemini API payload",
      "Gemini synthesizes precise step-by-step troubleshooting response"
    ]
  },
  {
    id: 13,
    title: "Avengers Endgame Review Finder",
    category: "Natural Language Processing",
    status: "Completed",
    description: "Interactive sentiment analyzer and keyword extraction tool parsing viewer reviews for the film Avengers: Endgame using NLP pipelines.",
    image: "/assets/images/project1.png",
    tags: ["Python", "Streamlit", "NLP", "TextBlob", "NLTK"],
    githubUrl: "https://github.com/AnkitYadav10533/ARTIFICIAL-INTELLIGENCE-SUMMER-INTERNSHIP/tree/main/Project%2014%20-%20Avengers%20Endgame%20Review%20Finder",
    liveUrl: "https://avengersendgamereviewfinder-bd24aj7b7cneoxal9tftsu.streamlit.app/",
    features: [
      "Direct keyword searching in reviews databases.",
      "Distribution graphs of review sentiments (positive/negative/neutral).",
      "User interface with movie themes and interactive statistics charts."
    ],
    architecture: "User Query -> Regex Pattern Matcher -> TextBlob Sentiment Processor -> Streamlit Visual Chart Renderer",
    flowchart: [
      "User types search keyword or regex query",
      "Reviews database parsed for matching matches",
      "NLTK sentiment analysis processes matching text blocks",
      "Data aggregated into positive, negative, and neutral metrics",
      "Streamlit UI draws sentiment breakdown graphs and reviews list"
    ]
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative overflow-hidden bg-black/60">
      {/* Background blobs */}
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#bd00ff]/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 relative">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            PORTFOLIO
          </span>
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
            My Projects
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROJECTS_DATA.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <GlassCard
                glowColor={project.id % 2 === 0 ? "purple" : "cyan"}
                className="h-full flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-black/40 border border-white/5 select-none">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                    />
                    <div className="absolute top-3 left-3 bg-[#030303]/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-md">
                      {project.status.includes("Winner") && (
                        <Award className="w-3.5 h-3.5 text-accent animate-pulse" />
                      )}
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold">
                      {project.category}
                    </span>
                    <h3 className="font-syne text-xl font-bold text-white mt-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {project.description.substring(0, 120)}...
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-500">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card CTA Row */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-primary transition-colors cursor-none"
                  >
                    <FileText className="w-4 h-4" />
                    Case Study
                  </button>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:scale-110 transition-all cursor-none"
                      aria-label="GitHub Repository"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:text-white hover:bg-primary/20 hover:scale-110 transition-all cursor-none"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
                className="w-full max-w-4xl rounded-2xl border border-white/10 bg-[#06060c] shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#030308]/60 backdrop-blur-md">
                  <div>
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-syne text-2xl font-bold text-white mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all cursor-none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Scroll Content */}
                <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto space-y-8 select-none">
                  {/* Banner Image */}
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-black/50">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Info details */}
                    <div className="lg:col-span-8 space-y-6">
                      <div>
                        <h4 className="font-syne text-lg font-bold text-white mb-3">
                          Project Overview
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {selectedProject.description}
                        </p>
                      </div>

                      {/* Key features */}
                      <div>
                        <h4 className="font-syne text-lg font-bold text-white mb-3">
                          Key Features
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedProject.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-400"
                            >
                              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Flowchart step logs */}
                      <div>
                        <h4 className="font-syne text-lg font-bold text-white mb-3">
                          Processing Flow
                        </h4>
                        <div className="relative border-l border-white/10 pl-5 ml-2 space-y-4">
                          {selectedProject.flowchart.map((step, idx) => (
                            <div key={idx} className="relative">
                              <span className="absolute -left-7 top-0.5 w-4 h-4 rounded-full bg-[#06060c] border-2 border-secondary flex items-center justify-center text-[8px] font-mono text-secondary shadow-[0_0_8px_#bd00ff]" />
                              <h5 className="text-xs font-semibold text-gray-200 mb-0.5">
                                Step {idx + 1}
                              </h5>
                              <p className="text-xs text-gray-400">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Technical specifications */}
                    <div className="lg:col-span-4 space-y-6">
                      {/* Tech badges */}
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                        <h4 className="font-syne text-sm font-bold text-white mb-4 uppercase tracking-widest">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-mono text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Architecture block */}
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-2 mb-3 text-secondary">
                          <Server className="w-4 h-4" />
                          <h4 className="font-syne text-sm font-bold text-white uppercase tracking-widest">
                            Architecture
                          </h4>
                        </div>
                        <p className="text-xs font-mono text-gray-400 leading-relaxed">
                          {selectedProject.architecture}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Links */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-white/5 bg-[#030308]/60 backdrop-blur-md">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/10 cursor-none"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    Source Code
                  </a>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold uppercase tracking-wider text-xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.02] cursor-none"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
    );
  }
  
