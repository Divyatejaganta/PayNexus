terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }
}

provider "kubernetes" {
  config_path = var.kubeconfig_path
}

provider "helm" {
  kubernetes {
    config_path = var.kubeconfig_path
  }
}

resource "kubernetes_namespace" "paynexus" {
  metadata {
    name = "paynexus"
  }
}

resource "helm_release" "paynexus" {
  name       = "paynexus"
  chart      = "${path.module}/../helm/paynexus"
  namespace  = kubernetes_namespace.paynexus.metadata[0].name

  values = [
    file("${path.module}/values.override.yaml")
  ]
}
