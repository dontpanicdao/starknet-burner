package main

import (
	"flag"
	"fmt"
	"os"
)

type conf struct {
	op   string
	priv string
}

func parseArgs(args []string) (*conf, error) {
	if len(args) < 1 {
		return nil, fmt.Errorf("noargs")
	}
	switch args[1] {
	case "pubkey":
		if len(args) < 3 {
			return nil, fmt.Errorf("noargs")
		}
		conf := conf{}
		flagset := flag.NewFlagSet("", flag.ExitOnError)
		flagset.StringVar(&conf.priv, "priv", "", "private key")
		err := flagset.Parse(args[2:])
		if err != nil {
			return nil, err
		}
		conf.op = "pubkey"
		return &conf, err
	}
	return nil, fmt.Errorf("unknown op")
}

func main() {
	conf, err := parseArgs(os.Args)
	if err != nil {
		panic(err.Error())
	}
	switch conf.op {
	case "pubkey":
		_, err := pubkey(conf.priv)
		if err != nil {
			panic(err.Error())
		}
	}
}
