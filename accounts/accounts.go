package accounts

import (
	"encoding/json"
	"os"
)

type accountPlugin struct {
	PluginHash     string `json:"pluginHash"`
	AccountAddress string `json:"accountAddress"`
}

func (ap *accountPlugin) Read(filename string) error {
	content, err := os.ReadFile(filename)
	if err != nil {
		return err
	}
	json.Unmarshal(content, ap)
	return nil
}

func (ap *accountPlugin) Write(filename string) error {
	content, err := json.Marshal(ap)
	if err != nil {
		return err
	}
	return os.WriteFile(filename, content, 0664)
}
