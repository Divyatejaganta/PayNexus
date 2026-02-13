{{- define "paynexus.name" -}}
{{- default .Chart.Name .Values.nameOverride -}}
{{- end -}}

{{- define "paynexus.fullname" -}}
{{- printf "%s-%s" (include "paynexus.name" .) .Release.Name -}}
{{- end -}}
